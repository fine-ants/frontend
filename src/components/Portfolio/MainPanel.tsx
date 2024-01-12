import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EmptyPortfolioHoldingTable from "./PortfolioHolding/EmptyPortfolioHoldingTable";
import PortfolioHoldingTable from "./PortfolioHolding/PortfolioHoldingTable";
import PortfolioOverview from "./PortfolioOverview";

export default function MainPanel() {
  const { portfolioId } = useParams();

  const { data: portfolio } = usePortfolioDetailsQuery(Number(portfolioId));
  const { portfolioDetails, portfolioHoldings } = portfolio;

  const hasNoHoldings = portfolioHoldings.length === 0;

  return (
    <StyledMainPanel>
      <PortfolioOverviewContainer>
        <PortfolioOverview data={portfolioDetails} />
      </PortfolioOverviewContainer>

      {hasNoHoldings ? (
        <EmptyPortfolioHoldingTable />
      ) : (
        <PortfolioHoldingsContainer>
          <PortfolioHoldingTable data={portfolioHoldings} />
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
