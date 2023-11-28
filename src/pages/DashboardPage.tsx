import ValuationOverview from "@components/Dashboard/DashboardOverview";
import DashboardPortfolioWeight from "@components/Dashboard/DashboardPortfolioWeight";
import DashboardTotalValuationTrend from "@components/Dashboard/DashboardTotalValuationTrend";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  return (
    <BasePage>
      <ValuationOverview />

      <ChartContainer>
        <DashboardPortfolioWeight />
        <DashboardTotalValuationTrend />
      </ChartContainer>
    </BasePage>
  );
}

const ChartContainer = styled.div`
  width: 100%;
  margin: 48px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
`;
