import ValuationOverview from "@components/Dashboard/DashboardOverview";
import PortfolioPieChartContainer from "@components/Dashboard/DashboardPortfolioWeight";
import TotalValuationLineChartContainer from "@components/Dashboard/DashboardTotalValuationTrend";
import PortfolioAddDialog from "@components/Portfolio/PortfolioDialog";
import { useState } from "react";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  const [isPortfolioAddDialogOpen, setIsPortfolioAddDialogOpen] =
    useState(false);

  const onPortfolioAddDialogOpen = () => {
    setIsPortfolioAddDialogOpen(true);
  };

  const onPortfolioAddDialogClose = () => {
    setIsPortfolioAddDialogOpen(false);
  };

  return (
    <StyledDashboardPage>
      <ValuationOverview />
      <Content>
        <ChartContainer>
          <PortfolioPieChartContainer
            onPortfolioAddButtonClick={onPortfolioAddDialogOpen}
          />
          <TotalValuationLineChartContainer />
        </ChartContainer>
      </Content>
      {isPortfolioAddDialogOpen && (
        <PortfolioAddDialog
          isOpen={isPortfolioAddDialogOpen}
          onClose={onPortfolioAddDialogClose}
        />
      )}
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
