import SearchBarM from "@components/SearchBar/mobile/SearchBarM";
import styled from "styled-components";

export default function StockSearchPanelContext() {
  return (
    <StyledStockSearchPanelContext>
      <SearchBarM />
    </StyledStockSearchPanelContext>
  );
}

const StyledStockSearchPanelContext = styled.div`
  width: 100%;
`;
