import {
  PortfolioDetails,
  PortfolioHolding,
} from "@features/portfolio/api/types";
import { Box } from "@mui/material";
import styled from "styled-components";
import EmptyPortfolioHoldingTable from "../../PortfolioHolding/desktop/EmptyPortfolioHoldingTable";
import PortfolioHoldingTable from "../../PortfolioHolding/desktop/PortfolioHoldingTable";
import PortfolioOverviewD from "../../PortfolioOverview/desktop/PortfolioOverviewD";

type Props = {
  freshPortfolioDetailsData: PortfolioDetails;
  freshPortfolioHoldingsData: PortfolioHolding[];
  hasNoHoldings: boolean;
};

export default function MainPanelD({
  freshPortfolioDetailsData,
  freshPortfolioHoldingsData,
  hasNoHoldings,
}: Props) {
  return (
    <StyledMainPanel>
      <PortfolioOverviewContainer>
        <PortfolioOverviewD data={freshPortfolioDetailsData} />
      </PortfolioOverviewContainer>

      {hasNoHoldings ? (
        <EmptyPortfolioHoldingTable />
      ) : (
        <PortfolioHoldingsContainer>
          <PortfolioHoldingTable data={freshPortfolioHoldingsData} />
        </PortfolioHoldingsContainer>
      )}
    </StyledMainPanel>
  );
}

const StyledMainPanel = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const PortfolioOverviewContainer = styled.div`
  width: 100%;
`;

const PortfolioHoldingsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 896px;
`;
