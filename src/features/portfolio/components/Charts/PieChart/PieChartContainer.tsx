import emptyHoldingsPieChartImg from "@assets/images/no_holdings_pie_chart.png";
import WideLegend from "@components/Legend/WideLegend";
import PieChart from "@components/PieChart/PieChart";
import designSystem from "@styles/designSystem";
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
  const hasNoHoldings =
    coloredPieChart.length === 1 && coloredPieChart[0].name === "현금";

  return (
    <StyledPieChartContainer>
      <ChartLabel>종목 구성</ChartLabel>
      <PieChartWrapper>
        {hasNoHoldings ? (
          <img src={emptyHoldingsPieChartImg} alt="비어있는 파이차트 이미지" />
        ) : (
          <PieChart
            width={256}
            height={256}
            hoverGap={12.8}
            pieData={coloredPieChart}
          />
        )}
        {!hasNoHoldings && (
          <WideLegend
            legendList={pieChartLegendList}
            etcOptions={{ title: "기타", numItemsFromFront: 10 }}
          />
        )}
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
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;
