import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";

import TimeRangeButton from "@components/Dashboard/TimeRangeButton";
import TotalValuationLineChart from "@components/Dashboard/TotalValuationLineChart";
import ValuationOverview from "@components/Dashboard/ValuationOverview";
import Legend from "@components/common/PieChart/Legend";
import PortfolioPieChart from "@components/common/PieChart/PortfolioPieChart";
import { useState } from "react";
import styled from "styled-components";
import { chartColorPalette } from "styles/chartColorPalette";
import BasePage from "./BasePage";

export type PieChartData = {
  name: string;
  value: number;
  fill: string;
  totalGain: number;
  totalGainRate: number;
};

export default function DashboardPage() {
  const range = ["일", "주", "월", "분기", "연"];
  const [currentRangeIndex, setCurrentRangeIndex] = useState(0);

  const { data: pieData } = usePortfolioListQuery();

  const coloredPieData = pieData?.portfolios
    .sort((a, b) => b.budget - a.budget) // 먼저 정렬
    .map((item, index) => ({
      name: item.name,
      value: item.budget,
      fill: chartColorPalette[index],
      totalGain: item.totalGain,
      totalGainRate: item.totalGainRate,
    }));

  const switchTimeRange = (index: number) => {
    setCurrentRangeIndex(index);
  };

  return (
    <StyledDashboardPage>
      <ValuationOverview />
      <Content>
        <ChartContainer>
          <PortfolioPieChartContainer>
            <ChartTitle>포트폴리오 비중</ChartTitle>
            <div style={{ display: "flex", gap: "24px" }}>
              <PortfolioPieChart
                width={320}
                height={320}
                coloredPieData={coloredPieData ?? []}
              />
              <Legend pieData={coloredPieData ?? []} />
            </div>
          </PortfolioPieChartContainer>
          <TotalValuationLineChartContainer>
            <ChartTitle>총 자산 현황 추이</ChartTitle>
            <DateRangeSelector>
              {range.map((range, index) => (
                <TimeRangeButton
                  key={index}
                  range={range}
                  index={index}
                  onClick={switchTimeRange}
                  currentRangeIndex={currentRangeIndex}
                />
              ))}
            </DateRangeSelector>
            <TotalValuationLineChart
              key={currentRangeIndex}
              currentRangeIndex={currentRangeIndex}
              data={data}
            />
          </TotalValuationLineChartContainer>
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

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
`;

const PortfolioPieChartContainer = styled.div`
  width: 708px;
  height: 480px;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 32px;
  gap: 24px;
`;

const ChartTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
`;

const TotalValuationLineChartContainer = styled.div`
  width: 708px;
  height: 475px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  gap: 24px;
  padding: 32px 24px;
`;

const data = [
  { time: "2018-10-19", value: 5012346 },
  { time: "2018-10-22", value: 4678901 },
  { time: "2018-10-23", value: 5387654 },
  { time: "2018-10-24", value: 4123457 },
  { time: "2018-10-25", value: 5690123 },
  { time: "2018-10-26", value: 4756789 },
  { time: "2018-10-29", value: 5345679 },
  { time: "2018-10-30", value: 4123457 },
  { time: "2018-10-31", value: 5345679 },
  { time: "2018-11-01", value: 4678901 },
  { time: "2018-11-02", value: 4901235 },
  { time: "2018-11-05", value: 5690123 },
  { time: "2018-11-06", value: 5012346 },
  { time: "2018-11-07", value: 4901235 },
  { time: "2018-11-08", value: 5012346 },
  { time: "2018-11-09", value: 5012346 },
  { time: "2018-11-12", value: 5123457 },
  { time: "2018-11-13", value: 5567890 },
  { time: "2018-11-14", value: 5234568 },
  { time: "2018-11-15", value: 5012346 },
  { time: "2018-11-16", value: 5012346 },
  { time: "2018-11-19", value: 5012346 },
  { time: "2018-11-20", value: 4678901 },
  { time: "2018-11-21", value: 5234568 },
  { time: "2018-11-23", value: 4678901 },
  { time: "2018-11-26", value: 5234568 },
  { time: "2018-11-27", value: 5690123 },
  { time: "2018-11-28", value: 5690123 },
  { time: "2018-11-29", value: 4556789 },
  { time: "2018-11-30", value: 4123457 },
  { time: "2018-12-03", value: 4123457 },
  { time: "2018-12-04", value: 4234568 },
  { time: "2018-12-06", value: 3789012 },
  { time: "2018-12-07", value: 3901235 },
  { time: "2018-12-10", value: 3654321 },
  { time: "2018-12-11", value: 4789012 },
  { time: "2018-12-12", value: 3901235 },
  { time: "2018-12-13", value: 4456789 },
  { time: "2018-12-14", value: 5234568 },
  { time: "2018-12-17", value: 3789012 },
  { time: "2018-12-18", value: 3654321 },
  { time: "2018-12-19", value: 5901235 },
  { time: "2018-12-20", value: 5234568 },
  { time: "2018-12-21", value: 5789012 },
  { time: "2018-12-24", value: 5901235 },
  { time: "2018-12-26", value: 5901235 },
  { time: "2018-12-27", value: 5567890 },
  { time: "2018-12-28", value: 5012346 },
  { time: "2018-12-31", value: 5690123 },
  { time: "2019-01-02", value: 4678901 },
  { time: "2019-01-03", value: 4456789 },
  { time: "2019-01-04", value: 4567890 },
  { time: "2019-01-07", value: 4678901 },
  { time: "2019-01-08", value: 4678901 },
  { time: "2019-01-09", value: 4123457 },
  { time: "2019-01-10", value: 5690123 },
  { time: "2019-01-11", value: 6123457 },
  { time: "2019-01-14", value: 6234568 },
  { time: "2019-01-15", value: 6345679 },
  { time: "2019-01-16", value: 6789012 },
  { time: "2019-01-17", value: 6678901 },
  { time: "2019-01-18", value: 4567890 },
  { time: "2019-01-22", value: 5690123 },
  { time: "2019-01-23", value: 5123457 },
  { time: "2019-01-24", value: 5345679 },
  { time: "2019-01-25", value: 5789012 },
  { time: "2019-01-28", value: 5901235 },
  { time: "2019-01-29", value: 5123457 },
  { time: "2019-01-30", value: 5789012 },
];
