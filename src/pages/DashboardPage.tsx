import { AsyncBoundary } from "@components/AsyncBoundary";
import DashboardOverview from "@features/dashboard/components/DashboardOverview/DashboardOverview";
import DashboardPortfolioWeight from "@features/dashboard/components/DashboardPortfolioWeight";
import DashboardTotalValuationTrend from "@features/dashboard/components/DashboardTotalValuationTrend";
import { ChartErrorFallback } from "@features/dashboard/components/errorFallback/ChartErrorFallback";
import { OverviewErrorFallback } from "@features/dashboard/components/errorFallback/OverviewErrorFallback";
import { DashboardLineChartSkeleton } from "@features/dashboard/components/skeletons/DashboardLineChartSkeleton";
import { DashboardOverviewSkeleton } from "@features/dashboard/components/skeletons/DashboardOverviewSkeleton";
import DashboardPieChartSkeleton from "@features/dashboard/components/skeletons/DashboardPieChartSkeleton";
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
