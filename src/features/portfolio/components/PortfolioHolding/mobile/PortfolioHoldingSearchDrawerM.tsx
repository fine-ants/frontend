import BottomDrawer from "@components/Drawer/BottomDrawer";
import SearchBarM from "@components/SearchBar/mobile/SearchBarM";
import styled from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
};

export default function PortfolioHoldingSearchDrawerM({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
}: Props) {
  return (
    <BottomDrawer
      customStyle={{ height: "calc(100vh - 64px)" }}
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={onDrawerOpen}
      onCloseDrawer={onDrawerClose}>
      <DrawerContent>
        <SearchBarM variant="select" />
      </DrawerContent>
    </BottomDrawer>
  );
}

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 0;
  height: 100%;
`;
