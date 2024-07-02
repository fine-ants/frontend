import Button from "@components/Buttons/Button";
import BottomDrawer from "@components/Drawer/BottomDrawer";
import SearchBarM from "@components/SearchBar/mobile/SearchBarM";
import { BOTTOM_DRAWER_TOP_SPACE } from "@constants/styleConstants";
import { StockSearchItem } from "@features/stock/api";
import styled from "styled-components";

type Props = {
  originalSelectedStocks: StockSearchItem[];
  selectedStocks: StockSearchItem[];
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  onSelectOption: (stock: StockSearchItem) => void;
  clearSelectedStocks: () => void;
  updateOriginalSelectedStocks: () => void;
};

export default function WatchlistItemAddDrawerM({
  originalSelectedStocks,
  selectedStocks,
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  onSelectOption,
  clearSelectedStocks,
  updateOriginalSelectedStocks,
}: Props) {
  const isDisabledButton =
    JSON.stringify(originalSelectedStocks) === JSON.stringify(selectedStocks);

  return (
    <BottomDrawer
      customStyle={{ height: `calc(100vh - ${BOTTOM_DRAWER_TOP_SPACE}px)` }}
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={onDrawerOpen}
      onCloseDrawer={() => {
        onDrawerClose();
        clearSelectedStocks();
      }}>
      <DrawerContent>
        {isDrawerOpen && (
          <SearchBarM
            variant="select-multiple"
            onSelectOption={(stock) => {
              onSelectOption(stock);
            }}
            selectedOptions={selectedStocks}
          />
        )}

        <ButtonWrapper>
          <StyledButton
            variant="primary"
            size="h48"
            disabled={isDisabledButton}
            onClick={() => {
              updateOriginalSelectedStocks();
              onDrawerClose();
            }}>
            선택 항목 추가
          </StyledButton>
        </ButtonWrapper>
      </DrawerContent>
    </BottomDrawer>
  );
}

const DrawerContent = styled.div`
  height: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 48px;
  margin: 16px 0 8px;
  padding: 0 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: auto;
`;
