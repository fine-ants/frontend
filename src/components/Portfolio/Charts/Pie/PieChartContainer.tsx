import WideLegend from "@components/common/Legend/WideLegend";
import PieChart from "@components/common/PieChart/PieChart";
import styled from "styled-components";

type Props = {
  coloredPieChart: {
    fill: string;
    id: number;
    name: string;
    valuation: number;
    totalGain: number;
    totalGainRate: number;
    weight: number;
  }[];
  pieChartLegendList: {
    title: string;
    percent: number;
    color: string;
  }[];
};

export function PieChartContainer({
  coloredPieChart,
  pieChartLegendList,
}: Props) {
  return (
    <StyledPieChartContainer>
      <ChartLabel>종목 구성</ChartLabel>
      <PieChartWrapper>
        <PieChart
          width={256}
          height={256}
          hoverGap={12.8}
          pieData={coloredPieChart}
        />
        <WideLegend
          legendList={pieChartLegendList}
          etcOptions={{ title: "기타", numItemsFromFront: 10 }}
        />
      </PieChartWrapper>
    </StyledPieChartContainer>
  );
}

const StyledPieChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ChartLabel = styled.h1`
  font: ${({ theme: { font } }) => font.heading3};
`;
