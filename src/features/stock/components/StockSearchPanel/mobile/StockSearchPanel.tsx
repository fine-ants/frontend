import { IconButton } from "@components/Buttons/IconButton";
import RightDrawer from "@components/Drawer/RightDrawer";
import SearchBarM from "@components/SearchBar/mobile/SearchBarM";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

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
        <PanelHeader>
          <IconButton
            icon="arrow-left"
            size="h40"
            iconColor="custom"
            customColor={{ color: "gray800", hoverColor: "gray50" }}
            onClick={onClosePanel}
          />
          <PanelTitle>검색</PanelTitle>
        </PanelHeader>

        <PanelContent>
          <SearchBarM />
        </PanelContent>
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

const PanelHeader = styled.header`
  width: 100%;
  padding: 16px;
  display: flex;
  position: relative;
`;

const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const PanelContent = styled.div`
  width: 100%;
`;
