import ValuationOverview from "@components/Dashboard/DashboardOverview";
import PortfolioPieChartContainer from "@components/Dashboard/DashboardPortfolioWeight";
import TotalValuationLineChartContainer from "@components/Dashboard/DashboardTotalValuationTrend";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  return (
    <StyledDashboardPage>
      <ValuationOverview />
      <Content>
        <ChartContainer>
          <PortfolioPieChartContainer />
          <TotalValuationLineChartContainer />
        </ChartContainer>
      </Content>
    </StyledDashboardPage>
  );
}

const StyledDashboardPage = styled(BasePage)``;

const Content = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  position: relative;
  margin: 48px 0;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
`;
