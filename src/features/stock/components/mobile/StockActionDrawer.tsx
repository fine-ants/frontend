import BottomDrawer from "@components/Drawer/BottomDrawer";
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
          <ContentItem>
            <ContentItemButton
              onClick={() => {
                onDrawerClose();
                onWatchlistHasStockDrawerOpen();
              }}>
              <ContentWrapper>
                <Icon icon="favorite" size={24} color="gray400" />
                <ItemTitle>관심 종목 설정</ItemTitle>
              </ContentWrapper>
            </ContentItemButton>
          </ContentItem>
          <ContentItem>
            <ContentItemButton
              onClick={() => {
                onDrawerClose();
                onDialogOpen();
              }}>
              <ContentWrapper>
                <Icon icon="notification" size={24} color="gray400" />
                <ItemTitle>알림 설정</ItemTitle>
              </ContentWrapper>
            </ContentItemButton>
          </ContentItem>
        </ul>
      </BottomDrawer>

      {isWatchlistHasStockDrawerOpen && (
        <WatchlistHasStockDrawer
          tickerSymbol={tickerSymbol}
          isOpen={isWatchlistHasStockDrawerOpen}
          onOpen={onWatchlistHasStockDrawerOpen}
          onClose={onWatchlistHasStockDrawerClose}
        />
      )}

      {isDialogOpen && (
        <TargetPriceAlertDialog isOpen={isDialogOpen} onClose={onDialogClose} />
      )}
    </>
  );
}

const ContentItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const ContentItemButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;

const ItemTitle = styled.span`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
