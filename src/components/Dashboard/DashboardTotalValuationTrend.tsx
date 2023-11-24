import useDashboardTotalValuationTrendQuery from "@api/dashboard/queries/useDashboardLineChartQuery";
import { useState } from "react";
import styled from "styled-components";
import TimeRangeButton from "./TimeRangeButton";
import TotalValuationLineChart from "./TotalValuationLineChart";

export default function DashboardTotalValuationTrend() {
  const { data: totalValuationData } = useDashboardTotalValuationTrendQuery();

  const range = ["일", "주", "월", "분기", "연"];

  const [currentRangeIndex, setCurrentRangeIndex] = useState(1);

  const switchTimeRange = (index: number) => {
    setCurrentRangeIndex(index);
  };
  return (
    <StyledDashboardLineChart>
      <TooltipRemover />
      <ChartTitle>총 자산 현황 추이</ChartTitle>
      <DateRangeSelector>
        {range.map((range, index) => {
          const onClick = () => {
            switchTimeRange(index);
          };
          return (
            <TimeRangeButton
              key={index}
              range={range}
              index={index}
              onClick={onClick}
              currentRangeIndex={currentRangeIndex}
            />
          );
        })}
      </DateRangeSelector>
      <TotalValuationLineChart
        data={totalValuationData ?? []}
        currentRangeIndex={currentRangeIndex}
      />
    </StyledDashboardLineChart>
  );
}

const StyledDashboardLineChart = styled.div`
  width: 708px;
  height: 475px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
  padding: 32px 24px;
`;

const DateRangeSelector = styled.div`
  width: 264px;
  height: 32px;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  justify-content: space-around;
  position: relative;
  margin-left: auto;
  display: flex;

  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
`;

const ChartTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
`;

const TooltipRemover = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 1000;
  top: 10px;
  left: 10px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;
