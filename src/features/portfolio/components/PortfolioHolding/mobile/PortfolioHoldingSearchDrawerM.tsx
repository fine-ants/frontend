import BottomDrawer from "@components/Drawer/BottomDrawer";
import SearchBarM from "@components/SearchBar/mobile/SearchBarM";
import { BOTTOM_DRAWER_TOP_SPACE } from "@constants/styleConstants";
import { StockSearchItem } from "@features/stock/api";
import styled from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  onSelectOption: (stock: StockSearchItem) => void;
};

export default function PortfolioHoldingSearchDrawerM({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  onSelectOption,
}: Props) {
  return (
    <BottomDrawer
      paperStyle={{ height: `calc(100vh - ${BOTTOM_DRAWER_TOP_SPACE}px)` }}
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={onDrawerOpen}
      onCloseDrawer={onDrawerClose}>
      <DrawerContent>
        <SearchBarM
          variant="select"
          onSelectOption={(stock) => {
            onSelectOption(stock);
            onDrawerClose();
          }}
        />
      </DrawerContent>
    </BottomDrawer>
  );
}

const DrawerContent = styled.div`
  height: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
