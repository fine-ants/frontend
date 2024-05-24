import useDashboardTotalValuationTrendQuery from "@features/dashboard/api/queries/useDashboardLineChartQuery";
import LineChartTabs from "@features/dashboard/components/LineChartTabs";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import { EmptyLineChartMessage } from "./EmptyLineChartMessage";
import TotalValuationLineChart from "./TotalValuationLineChart";

export default function DashboardTotalValuationTrend() {
  const { isMobile } = useResponsiveLayout();
  const { data: totalValuationData } = useDashboardTotalValuationTrendQuery();
  const isTotalValuationDataEmpty =
    !totalValuationData || totalValuationData.length === 0;

  const range = ["일", "주", "월", "분기", "연"];

  const [currentRangeIndex, setCurrentRangeIndex] = useState(1);

  const switchTimeRange = (index: number) => {
    setCurrentRangeIndex(index);
  };

  return (
    <StyledDashboardTotalValuationTrend
      $isTotalValuationDataEmpty={isTotalValuationDataEmpty}
      $isMobile={isMobile}>
      <ChartTitle $isMobile={isMobile}>총 자산 추이</ChartTitle>
      {isTotalValuationDataEmpty ? (
        <EmptyLineChartMessage />
      ) : (
        <>
          <TabWrapper $isMobile={isMobile}>
            <LineChartTabs
              tabs={range}
              currentIndex={currentRangeIndex}
              onClick={switchTimeRange}
            />
          </TabWrapper>
          <TotalValuationLineChart
            data={totalValuationData ?? []}
            currentRangeIndex={currentRangeIndex}
          />
        </>
      )}
    </StyledDashboardTotalValuationTrend>
  );
}

const StyledDashboardTotalValuationTrend = styled.div<{
  $isTotalValuationDataEmpty: boolean;
  $isMobile: boolean;
}>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "50%")};
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "480px")};
  min-height: 336px;
  padding: ${({ $isMobile }) => ($isMobile ? "0 16px" : "32px")};
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
`;

const TabWrapper = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  margin-left: auto;
`;

const ChartTitle = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.letterSpacing
      : designSystem.font.heading3.letterSpacing};
`;
