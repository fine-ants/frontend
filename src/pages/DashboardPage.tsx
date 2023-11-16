import PortfolioPieChart from "@components/Dashboard/PortfolioPieChart";
import TimeRangeButton from "@components/Dashboard/TimeRangeButton";
import TotalValuationLineChart from "@components/Dashboard/TotalValuationLineChart";
import ValuationOverview from "@components/Dashboard/ValuationOverview";
import { useState } from "react";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function DashboardPage() {
  const range = ["1D", "1W", "1M", "1Q", "1Y", "All"];
  const [currentRangeIndex, setCurrentRangeIndex] = useState(0);

  const switchTimeRange = (index: number) => {
    setCurrentRangeIndex(index);
  };

  return (
    <StyledDashboardPage>
      <Content>
        <PageTitle>모카 님의 대시보드</PageTitle>
        <ValuationOverview />
        <CurrentChartContainer>
          <ChartContainer>
            <PortfolioPieChartContainer>
              <PortfolioPieChart
                width={384}
                height={384}
                legendStyle={{ bottom: "15px" }}
              />
            </PortfolioPieChartContainer>
            <TotalValuationLineChartContainer>
              <DateRangeSelector>
                {range.map((range, index) => (
                  <TimeRangeButton
                    key={index}
                    range={range}
                    index={index}
                    onClick={switchTimeRange}
                  />
                ))}
              </DateRangeSelector>
              <TotalValuationLineChart
                key={currentRangeIndex}
                currentRangeIndex={currentRangeIndex}
                data={data[currentRangeIndex]}
              />
            </TotalValuationLineChartContainer>
          </ChartContainer>
        </CurrentChartContainer>
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
const PageTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const CurrentChartContainer = styled.div`
  width: 1440px;
  height: 456px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  position: relative;

  // z-index: 3;
`;

const DateRangeSelector = styled.div`
  width: 256px;
  height: 32px;
  position: relative;
  margin-left: 500px;

  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;

  background-color: #d6d3d3;
`;

const ChartContainer = styled.div`
  height: 456px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
`;

const PortfolioPieChartContainer = styled.div`
  width: 558px;
  height: 456px;
  background-color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 10px;
`;

const TotalValuationLineChartContainer = styled.div`
  width: 858px;
  height: 456px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const data = [
  [
    { time: "2018-10-19", value: 5012345.67 },
    { time: "2018-10-22", value: 4678901.23 },
    { time: "2018-10-23", value: 5387654.32 },
    { time: "2018-10-24", value: 4123456.78 },
    { time: "2018-10-25", value: 5690123.45 },
    { time: "2018-10-26", value: 4756789.01 },
    { time: "2018-10-29", value: 5345678.9 },
    { time: "2018-10-30", value: 4123456.78 },
    { time: "2018-10-31", value: 5345678.9 },
    { time: "2018-11-01", value: 4678901.23 },
    { time: "2018-11-02", value: 4901234.56 },
    { time: "2018-11-05", value: 5690123.45 },
    { time: "2018-11-06", value: 5012345.67 },
    { time: "2018-11-07", value: 4901234.56 },
    { time: "2018-11-08", value: 5012345.67 },
    { time: "2018-11-09", value: 5012345.67 },
    { time: "2018-11-12", value: 5123456.78 },
    { time: "2018-11-13", value: 5567890.12 },
    { time: "2018-11-14", value: 5234567.89 },
    { time: "2018-11-15", value: 5012345.67 },
    { time: "2018-11-16", value: 5012345.67 },
    { time: "2018-11-19", value: 5012345.67 },
    { time: "2018-11-20", value: 4678901.23 },
    { time: "2018-11-21", value: 5234567.89 },
    { time: "2018-11-23", value: 4678901.23 },
    { time: "2018-11-26", value: 5234567.89 },
    { time: "2018-11-27", value: 5690123.45 },
    { time: "2018-11-28", value: 5690123.45 },
    { time: "2018-11-29", value: 4556789.01 },
    { time: "2018-11-30", value: 4123456.78 },
    { time: "2018-12-03", value: 4123456.78 },
    { time: "2018-12-04", value: 4234567.89 },
    { time: "2018-12-06", value: 3789012.34 },
    { time: "2018-12-07", value: 3901234.56 },
    { time: "2018-12-10", value: 3654321.09 },
    { time: "2018-12-11", value: 4789012.34 },
    { time: "2018-12-12", value: 3901234.56 },
    { time: "2018-12-13", value: 4456789.01 },
    { time: "2018-12-14", value: 5234567.89 },
    { time: "2018-12-17", value: 3789012.34 },
    { time: "2018-12-18", value: 3654321.09 },
    { time: "2018-12-19", value: 5901234.56 },
    { time: "2018-12-20", value: 5234567.89 },
    { time: "2018-12-21", value: 5789012.34 },
    { time: "2018-12-24", value: 5901234.56 },
    { time: "2018-12-26", value: 5901234.56 },
    { time: "2018-12-27", value: 5567890.12 },
    { time: "2018-12-28", value: 5012345.67 },
    { time: "2018-12-31", value: 5690123.45 },
    { time: "2019-01-02", value: 4678901.23 },
    { time: "2019-01-03", value: 4456789.01 },
    { time: "2019-01-04", value: 4567890.12 },
    { time: "2019-01-07", value: 4678901.23 },
    { time: "2019-01-08", value: 4678901.23 },
    { time: "2019-01-09", value: 4123456.78 },
    { time: "2019-01-10", value: 5690123.45 },
    { time: "2019-01-11", value: 6123456.78 },
    { time: "2019-01-14", value: 6234567.89 },
    { time: "2019-01-15", value: 6345678.9 },
    { time: "2019-01-16", value: 6789012.34 },
    { time: "2019-01-17", value: 6678901.23 },
    { time: "2019-01-18", value: 4567890.12 },
    { time: "2019-01-22", value: 5690123.45 },
    { time: "2019-01-23", value: 5123456.78 },
    { time: "2019-01-24", value: 5345678.9 },
    { time: "2019-01-25", value: 5789012.34 },
    { time: "2019-01-28", value: 5901234.56 },
    { time: "2019-01-29", value: 5123456.78 },
    { time: "2019-01-30", value: 5789012.34 },
  ],
  [
    { time: "2018-10-19", value: 5012345.67 },
    { time: "2018-10-22", value: 4678901.23 },
    { time: "2018-10-23", value: 5387654.32 },
    { time: "2018-10-24", value: 4123456.78 },
    { time: "2018-10-25", value: 5690123.45 },
    { time: "2018-10-26", value: 4756789.01 },
    { time: "2018-10-29", value: 5345678.9 },
    { time: "2018-10-30", value: 4123456.78 },
    { time: "2018-10-31", value: 5345678.9 },
    { time: "2018-11-01", value: 4678901.23 },
    { time: "2018-11-02", value: 4901234.56 },
    { time: "2018-11-05", value: 5690123.45 },
    { time: "2018-11-06", value: 5012345.67 },
    { time: "2018-11-07", value: 4901234.56 },
    { time: "2018-11-08", value: 5012345.67 },
    { time: "2018-11-09", value: 5012345.67 },
    { time: "2018-11-12", value: 5123456.78 },
    { time: "2018-11-13", value: 5567890.12 },
    { time: "2018-11-14", value: 5234567.89 },
    { time: "2018-11-15", value: 5012345.67 },
    { time: "2018-11-16", value: 5012345.67 },
    { time: "2018-11-19", value: 5012345.67 },
    { time: "2018-11-20", value: 4678901.23 },
    { time: "2018-11-21", value: 5234567.89 },
    { time: "2018-11-23", value: 4678901.23 },
    { time: "2018-11-26", value: 5234567.89 },
    { time: "2018-11-27", value: 5690123.45 },
    { time: "2018-11-28", value: 5690123.45 },
    { time: "2018-11-29", value: 4556789.01 },
    { time: "2018-11-30", value: 4123456.78 },
    { time: "2018-12-03", value: 4123456.78 },
    { time: "2018-12-04", value: 4234567.89 },
    { time: "2018-12-06", value: 3789012.34 },
    { time: "2018-12-07", value: 3901234.56 },
    { time: "2018-12-10", value: 3654321.09 },
    { time: "2018-12-11", value: 4789012.34 },
    { time: "2018-12-12", value: 3901234.56 },
    { time: "2018-12-13", value: 4456789.01 },
    { time: "2018-12-14", value: 5234567.89 },
    { time: "2018-12-17", value: 3789012.34 },
    { time: "2018-12-18", value: 3654321.09 },
    { time: "2018-12-19", value: 5901234.56 },
    { time: "2018-12-20", value: 5234567.89 },
    { time: "2018-12-21", value: 5789012.34 },
    { time: "2018-12-24", value: 5901234.56 },
    { time: "2018-12-26", value: 5901234.56 },
    { time: "2018-12-27", value: 5567890.12 },
    { time: "2018-12-28", value: 5012345.67 },
    { time: "2018-12-31", value: 5690123.45 },
    { time: "2019-01-02", value: 4678901.23 },
    { time: "2019-01-03", value: 4456789.01 },
    { time: "2019-01-04", value: 4567890.12 },
    { time: "2019-01-07", value: 4678901.23 },
    { time: "2019-01-08", value: 4678901.23 },
    { time: "2019-01-09", value: 4123456.78 },
    { time: "2019-01-10", value: 5690123.45 },
    { time: "2019-01-11", value: 6123456.78 },
    { time: "2019-01-14", value: 6234567.89 },
    { time: "2019-01-15", value: 6345678.9 },
    { time: "2019-01-16", value: 6789012.34 },
  ],
  [
    { time: "2018-10-19", value: 5012345.67 },
    { time: "2018-10-22", value: 4678901.23 },
    { time: "2018-10-23", value: 5387654.32 },
    { time: "2018-10-24", value: 4123456.78 },
    { time: "2018-10-25", value: 5690123.45 },
    { time: "2018-10-26", value: 4756789.01 },
    { time: "2018-10-29", value: 5345678.9 },
    { time: "2018-10-30", value: 4123456.78 },
    { time: "2018-10-31", value: 5345678.9 },
    { time: "2018-11-01", value: 4678901.23 },
    { time: "2018-11-02", value: 4901234.56 },
    { time: "2018-11-05", value: 5690123.45 },
    { time: "2018-11-06", value: 5012345.67 },
    { time: "2018-11-07", value: 4901234.56 },
    { time: "2018-11-08", value: 5012345.67 },
    { time: "2018-11-09", value: 5012345.67 },
    { time: "2018-11-12", value: 5123456.78 },
    { time: "2018-11-13", value: 5567890.12 },
    { time: "2018-11-14", value: 5234567.89 },
    { time: "2018-11-15", value: 5012345.67 },
    { time: "2018-11-16", value: 5012345.67 },
    { time: "2018-11-19", value: 5012345.67 },
    { time: "2018-11-20", value: 4678901.23 },
    { time: "2018-11-21", value: 5234567.89 },
    { time: "2018-11-23", value: 4678901.23 },
    { time: "2018-11-26", value: 5234567.89 },
    { time: "2018-11-27", value: 5690123.45 },
    { time: "2018-11-28", value: 5690123.45 },
    { time: "2018-11-29", value: 4556789.01 },
    { time: "2018-11-30", value: 4123456.78 },
    { time: "2018-12-03", value: 4123456.78 },
    { time: "2018-12-04", value: 4234567.89 },
    { time: "2018-12-06", value: 3789012.34 },
    { time: "2018-12-07", value: 3901234.56 },
    { time: "2018-12-10", value: 3654321.09 },
    { time: "2018-12-11", value: 4789012.34 },
    { time: "2018-12-12", value: 3901234.56 },
    { time: "2018-12-13", value: 4456789.01 },
    { time: "2018-12-14", value: 5234567.89 },
    { time: "2018-12-17", value: 3789012.34 },
    { time: "2018-12-18", value: 3654321.09 },
    { time: "2018-12-19", value: 5901234.56 },
    { time: "2018-12-20", value: 5234567.89 },
    { time: "2018-12-21", value: 5789012.34 },
    { time: "2018-12-24", value: 5901234.56 },
    { time: "2018-12-26", value: 5901234.56 },
    { time: "2018-12-27", value: 5567890.12 },
  ],
  [
    { time: "2018-10-19", value: 5012345.67 },
    { time: "2018-10-22", value: 4678901.23 },
    { time: "2018-10-23", value: 5387654.32 },
    { time: "2018-10-24", value: 4123456.78 },
    { time: "2018-10-25", value: 5690123.45 },
    { time: "2018-10-26", value: 4756789.01 },
    { time: "2018-10-29", value: 5345678.9 },
    { time: "2018-10-30", value: 4123456.78 },
    { time: "2018-10-31", value: 5345678.9 },
    { time: "2018-11-01", value: 4678901.23 },
    { time: "2018-11-02", value: 4901234.56 },
    { time: "2018-11-05", value: 5690123.45 },
    { time: "2018-11-06", value: 5012345.67 },
    { time: "2018-11-07", value: 4901234.56 },
    { time: "2018-11-08", value: 5012345.67 },
    { time: "2018-11-09", value: 5012345.67 },
    { time: "2018-11-12", value: 5123456.78 },
    { time: "2018-11-13", value: 5567890.12 },
    { time: "2018-11-14", value: 5234567.89 },
    { time: "2018-11-15", value: 5012345.67 },
    { time: "2018-11-16", value: 5012345.67 },
    { time: "2018-11-19", value: 5012345.67 },
    { time: "2018-11-20", value: 4678901.23 },
    { time: "2018-11-21", value: 5234567.89 },
    { time: "2018-11-23", value: 4678901.23 },
    { time: "2018-11-26", value: 5234567.89 },
    { time: "2018-11-27", value: 5690123.45 },
    { time: "2018-11-28", value: 5690123.45 },
  ],
  [
    { time: "2018-10-19", value: 5012345.67 },
    { time: "2018-10-22", value: 4678901.23 },
    { time: "2018-10-23", value: 5387654.32 },
    { time: "2018-10-24", value: 4123456.78 },
    { time: "2018-10-25", value: 5690123.45 },
    { time: "2018-10-26", value: 4756789.01 },
    { time: "2018-10-29", value: 5345678.9 },
    { time: "2018-10-30", value: 4123456.78 },
    { time: "2018-10-31", value: 5345678.9 },
    { time: "2018-11-01", value: 4678901.23 },
    { time: "2018-11-02", value: 4901234.56 },
    { time: "2018-11-05", value: 5690123.45 },
    { time: "2018-11-06", value: 5012345.67 },
  ],
  [
    { time: "2018-10-19", value: 5012345.67 },
    { time: "2018-10-22", value: 4678901.23 },
    { time: "2018-10-23", value: 5387654.32 },
    { time: "2018-10-24", value: 4123456.78 },
    { time: "2018-10-25", value: 5690123.45 },
    { time: "2018-10-26", value: 4756789.01 },
    { time: "2018-10-29", value: 5345678.9 },
  ],
];
