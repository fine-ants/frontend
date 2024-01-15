import { useSSE } from "@api/hooks/useSSE";
import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import { PortfolioSSE } from "@api/portfolio/types";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EmptyPortfolioHoldingTable from "./PortfolioHolding/EmptyPortfolioHoldingTable";
import PortfolioHoldingTable from "./PortfolioHolding/PortfolioHoldingTable";
import PortfolioOverview from "./PortfolioOverview";

export default function MainPanel() {
  const { portfolioId } = useParams();

  const {
    data: portfolioSSE,
    // isError,
    //TODO: SSE 에러일때 핸들링처리
  } = useSSE<PortfolioSSE>({
    url: `/api/portfolio/${portfolioId}/holdings/realtime`,
    eventTypeName: "portfolioDetails",
  });
  const { data: portfolio } = usePortfolioDetailsQuery(Number(portfolioId));

  // Realtime Data
  const {
    portfolioDetails: portfolioDetailsSSE,
    portfolioHoldings: portfolioHoldingsSSE,
  } = portfolioSSE ?? { portfolioDetails: null, portfolioHoldings: [] };

  // Static Data
  const { portfolioDetails, portfolioHoldings } = portfolio;

  const freshPortfolioHoldingsData = [];
  for (let i = 0; i < portfolioHoldings.length; i++) {
    freshPortfolioHoldingsData.push({
      ...portfolioHoldings[i],
      ...portfolioHoldingsSSE[i],
    });
  }

  const hasNoHoldings = portfolioHoldings.length === 0;

  return (
    <StyledMainPanel>
      <PortfolioOverviewContainer>
        <PortfolioOverview
          data={portfolioDetails}
          sseData={portfolioDetailsSSE}
        />
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
