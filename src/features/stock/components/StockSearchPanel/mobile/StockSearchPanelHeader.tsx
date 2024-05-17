import { IconButton } from "@components/Buttons/IconButton";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  handleClose: () => void;
};

export default function StockSearchPanelHeader({ handleClose }: Props) {
  return (
    <StyledStockSearchPanelHeader>
      <IconButton
        icon="arrow-left"
        size="h40"
        iconColor="custom"
        customColor={{ color: "gray800", hoverColor: "gray50" }}
        onClick={handleClose}
      />
      <PanelTitle>검색</PanelTitle>
    </StyledStockSearchPanelHeader>
  );
}

const StyledStockSearchPanelHeader = styled.header`
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
