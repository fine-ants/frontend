import BottomDrawer from "@components/Drawer/BottomDrawer";
import DrawerItem from "@components/Drawer/DrawerItem";
import { Icon } from "@components/Icon";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import TargetPriceAlertDialog from "./TargetPriceAlertDialog";
import WatchlistHasStockDrawer from "./WatchlistHasStockDrawer/WatchlistHasStockDrawer";

type Props = {
  tickerSymbol: string;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
};

export default function StockActionDrawer({
  tickerSymbol,
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
}: Props) {
  const {
    state: isWatchlistHasStockDrawerOpen,
    setTrue: onWatchlistHasStockDrawerOpen,
    setFalse: onWatchlistHasStockDrawerClose,
  } = useBoolean();

  const {
    state: isDialogOpen,
    setTrue: onDialogOpen,
    setFalse: onDialogClose,
  } = useBoolean();

  return (
    <>
      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={onDrawerOpen}
        onCloseDrawer={onDrawerClose}>
        <ul>
          <DrawerItem
            onClick={() => {
              onDrawerClose();
              onWatchlistHasStockDrawerOpen();
            }}>
            <Icon icon="favorite" size={24} color="gray400" />
            <ItemTitle>관심 종목 설정</ItemTitle>
          </DrawerItem>
          <DrawerItem
            onClick={() => {
              onDrawerClose();
              onDialogOpen();
            }}>
            <Icon icon="notification" size={24} color="gray400" />
            <ItemTitle>알림 설정</ItemTitle>
          </DrawerItem>
        </ul>
      </BottomDrawer>

      <WatchlistHasStockDrawer
        tickerSymbol={tickerSymbol}
        isOpen={isWatchlistHasStockDrawerOpen}
        onOpen={onWatchlistHasStockDrawerOpen}
        onClose={onWatchlistHasStockDrawerClose}
      />

      {isDialogOpen && (
        <TargetPriceAlertDialog isOpen={isDialogOpen} onClose={onDialogClose} />
      )}
    </>
  );
}

const ItemTitle = styled.span`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;
