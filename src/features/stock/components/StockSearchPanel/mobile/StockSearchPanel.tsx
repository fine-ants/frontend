import RightDrawer from "@components/Drawer/RightDrawer";
import styled from "styled-components";
import StockSearchPanelContext from "./StockSearchPanelContent";
import StockSearchPanelHeader from "./StockSearchPanelHeader";

type Props = {
  isPanelOpen: boolean;
  onOpenPanel: () => void;
  onClosePanel: () => void;
};

export default function StockSearchPanel({
  isPanelOpen,
  onOpenPanel,
  onClosePanel,
}: Props) {
  return (
    <RightDrawer
      isDrawerOpen={isPanelOpen}
      onOpenDrawer={onOpenPanel}
      onCloseDrawer={onClosePanel}>
      <StyledStockSearchPanel>
        <StockSearchPanelHeader handleClose={onClosePanel} />

        <StockSearchPanelContext />

        {/* <NotificationPanelContent
          user={user}
          notifications={notifications}
          handleClose={onClosePanel}
        /> */}
      </StyledStockSearchPanel>
    </RightDrawer>
  );
}

const StyledStockSearchPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
