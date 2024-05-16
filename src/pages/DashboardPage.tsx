import { AsyncBoundary } from "@components/AsyncBoundary";
import DashboardOverview from "@features/dashboard/components/DashboardOverview";
import DashboardPortfolioWeight from "@features/dashboard/components/DashboardPortfolioWeight";
import DashboardTotalValuationTrend from "@features/dashboard/components/DashboardTotalValuationTrend";
import { ChartErrorFallback } from "@features/dashboard/components/errorFallback/ChartErrorFallback";
import { OverviewErrorFallback } from "@features/dashboard/components/errorFallback/OverviewErrorFallback";
import { DashboardLineChartSkeleton } from "@features/dashboard/components/skeletons/DashboardLineChartSkeleton";
import { DashboardOverviewSkeleton } from "@features/dashboard/components/skeletons/DashboardOverviewSkeleton";
import DashboardPieChartSkeleton from "@features/dashboard/components/skeletons/DashboardPieChartSkeleton";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  const { isMobile } = useResponsiveLayout();
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={OverviewErrorFallback}
        SuspenseFallback={<DashboardOverviewSkeleton />}>
        <DashboardOverview />
      </AsyncBoundary>
      <ChartsWrapper $isMobile={isMobile}>
        <ChartsContainer $isMobile={isMobile}>
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

const ChartsWrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  display: flex;
  justify-content: center;
`;

const ChartsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? "0" : "24px")};
`;
