import useDashboardTotalValuationTrendQuery from "@features/dashboard/api/queries/useDashboardLineChartQuery";
import LineChartTabs from "@features/dashboard/components/LineChartTabs";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
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
        <EmptyLineChartMessage>
          <MessageBox>
            <h1>아직 자산이 없습니다</h1>
            <span>
              내가 보유한 자산 추이가
              <br />
              여기에 표시됩니다
            </span>
          </MessageBox>
        </EmptyLineChartMessage>
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
  border: ${({ $isTotalValuationDataEmpty, theme: { color } }) =>
    $isTotalValuationDataEmpty
      ? `1px dashed ${color.neutral.gray100}`
      : "none"};
  border-radius: 10px;
`;

const EmptyLineChartMessage = styled.div`
  width: 100%;
  height: 363px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${designSystem.color.primary.blue100};
  border-radius: 8px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 82px;

  > h1 {
    font: ${designSystem.font.title3.font};
    letter-spacing: ${designSystem.font.title3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    text-align: center;
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray500};
  }
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
