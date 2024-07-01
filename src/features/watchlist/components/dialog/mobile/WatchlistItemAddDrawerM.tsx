import Button from "@components/Buttons/Button";
import BottomDrawer from "@components/Drawer/BottomDrawer";
import SearchBarM from "@components/SearchBar/mobile/SearchBarM";
import { BOTTOM_DRAWER_TOP_SPACE } from "@constants/styleConstants";
import { StockSearchItem } from "@features/stock/api";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  selectedStocks: StockSearchItem[];
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  onSelectOption: (stock: StockSearchItem[]) => void;
};

export default function WatchlistItemAddDrawerM({
  selectedStocks: originalSelectedStocks,
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  onSelectOption: onOriginalSelectOption,
}: Props) {
  const [selectedStocks, setSelectedStocks] = useState<StockSearchItem[]>(
    originalSelectedStocks
  );

  const onSelectOption = (option: StockSearchItem) => {
    setSelectedStocks((prev) => {
      const index = prev.findIndex(
        (stock) => stock.tickerSymbol === option.tickerSymbol
      );

      if (index === -1) {
        return [...prev, option];
      } else {
        return prev.filter(
          (stock) => stock.tickerSymbol !== option.tickerSymbol
        );
      }
    });
  };

  const combinedSelectedStocks = [...originalSelectedStocks, ...selectedStocks];

  const uniqueSelectedStocks = [...new Set(combinedSelectedStocks)];

  return (
    <BottomDrawer
      customStyle={{ height: `calc(100vh - ${BOTTOM_DRAWER_TOP_SPACE}px)` }}
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={onDrawerOpen}
      onCloseDrawer={() => {
        onDrawerClose();
        setSelectedStocks([]);
      }}>
      <DrawerContent>
        {isDrawerOpen && (
          <SearchBarM
            variant="select-multiple"
            onSelectOption={(stock) => {
              onSelectOption(stock);
            }}
            selectedOptions={uniqueSelectedStocks}
          />
        )}

        <ButtonWrapper>
          <StyledButton
            variant="primary"
            size="h48"
            onClick={() => {
              onOriginalSelectOption(uniqueSelectedStocks);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  margin-top: 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 16px;
  padding: 0 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: auto;
`;
