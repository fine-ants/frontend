import { AsyncBoundary } from "@components/AsyncBoundary";
import BottomDrawer from "@components/Drawer/BottomDrawer";
import { Icon } from "@components/Icon";
import NewWatchlistDialog from "@features/watchlist/components/dialog/NewWatchlistDialog";
import { useBoolean } from "@fineants/demolition";
import { Button as MuiButton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import WatchlistHasStockListErrorFallback from "../../desktop/WatchlistHasStockDropdown/errorFallback/WatchlistHasStockListErrorFallback";
import WatchlistHasStockDrawerList from "./WatchlistHasStockDrawerList";
import WatchlistHasStockDrawerListSkeleton from "./skeleton/WatchlistHasStockDrawerListSkeleton";

type Props = {
  tickerSymbol: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function WatchlistHasStockDrawer({
  tickerSymbol,
  isOpen,
  onOpen,
  onClose,
}: Props) {
  const {
    state: isNewWatchlistDialogOpen,
    setTrue: onNewWatchlistDialogOpen,
    setFalse: onNewWatchlistDialogClose,
  } = useBoolean();

  return (
    <>
      <BottomDrawer
        isDrawerOpen={isOpen}
        onOpenDrawer={onOpen}
        onCloseDrawer={onClose}>
        <NewWatchlistButtonWrapper>
          <NewWatchlistButton variant="text" onClick={onNewWatchlistDialogOpen}>
            <Icon icon="folder-add" size={16} color="gray600" />
            <span>새 리스트 추가</span>
          </NewWatchlistButton>
        </NewWatchlistButtonWrapper>
        <AsyncBoundary
          SuspenseFallback={<WatchlistHasStockDrawerListSkeleton />}
          ErrorFallback={WatchlistHasStockListErrorFallback}>
          <WatchlistHasStockDrawerList tickerSymbol={tickerSymbol} />
        </AsyncBoundary>
      </BottomDrawer>

      <NewWatchlistDialog
        isOpen={isNewWatchlistDialogOpen}
        onClose={onNewWatchlistDialogClose}
      />
    </>
  );
}

const NewWatchlistButtonWrapper = styled.div`
  width: 100%;
  margin: 16px 0 24px;
  padding-inline: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NewWatchlistButton = styled(MuiButton)`
  display: flex;
  gap: 4px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;
