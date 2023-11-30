import DashboardOverview from "@components/Dashboard/DashboardOverview";
import DashboardPortfolioWeight from "@components/Dashboard/DashboardPortfolioWeight";
import DashboardTotalValuationTrend from "@components/Dashboard/DashboardTotalValuationTrend";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  return (
    <BasePage>
      <DashboardOverview />

      <ChartsWrapper>
        <ChartsContainer>
          <DashboardPortfolioWeight />
          <DashboardTotalValuationTrend />
        </ChartsContainer>
      </ChartsWrapper>
    </BasePage>
  );
}

const ChartsWrapper = styled.div`
  width: 100%;
  padding: 48px;
  display: flex;
  justify-content: center;
`;

const ChartsContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: center;
  gap: 24px;
`;
