import DashboardOverview from "@components/Dashboard/DashboardOverview";
import DashboardPortfolioWeight from "@components/Dashboard/DashboardPortfolioWeight";
import DashboardTotalValuationTrend from "@components/Dashboard/DashboardTotalValuationTrend";
import { ChartErrorFallback } from "@components/Dashboard/errorFallback/ChartErrorFallback";
import { OverviewErrorFallback } from "@components/Dashboard/errorFallback/OverviewErrorFallback";
import { DashboardLineChartSkeleton } from "@components/Dashboard/skeletons/DashboardLineChartSkeleton";
import { DashboardOverviewSkeleton } from "@components/Dashboard/skeletons/DashboardOverviewSkeleton";
import DashboardPieChartSkeleton from "@components/Dashboard/skeletons/DashboardPieChartSkeleton";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={OverviewErrorFallback}
        SuspenseFallback={<DashboardOverviewSkeleton />}>
        <DashboardOverview />
      </AsyncBoundary>
      <ChartsWrapper>
        <ChartsContainer>
          <AsyncBoundary
            ErrorFallback={ChartErrorFallback}
            SuspenseFallback={<DashboardPieChartSkeleton />}>
            <DashboardPortfolioWeight />
          </AsyncBoundary>
          <AsyncBoundary
            ErrorFallback={ChartErrorFallback}
            SuspenseFallback={<DashboardLineChartSkeleton />}>
            <DashboardTotalValuationTrend />
          </AsyncBoundary>
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
