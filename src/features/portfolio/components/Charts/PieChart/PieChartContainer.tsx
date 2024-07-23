import emptyHoldingsPieChartImg from "@assets/images/no_holdings_pie_chart.png";
import TallLegend from "@components/Legend/TallLegend";
import WideLegend from "@components/Legend/WideLegend";
import PieChart from "@components/PieChart/PieChart";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
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
  const { isMobile } = useResponsiveLayout();

  const hasNoHoldings =
    coloredPieChart.length === 1 && coloredPieChart[0].name === "현금";

  return (
    <StyledPieChartContainer>
      <ChartLabel $isMobile={isMobile}>종목 구성</ChartLabel>
      <PieChartWrapper>
        {hasNoHoldings ? (
          <img src={emptyHoldingsPieChartImg} alt="비어있는 파이차트 이미지" />
        ) : (
          <PieChart
            width={isMobile ? 280 : 256}
            height={isMobile ? 280 : 256}
            hoverGap={isMobile ? 14 : 12.8}
            pieData={coloredPieChart}
          />
        )}
        {!hasNoHoldings &&
          (isMobile ? (
            <TallLegend
              legendList={pieChartLegendList}
              etcOptions={{ title: "기타", numItemsFromFront: 10 }}
            />
          ) : (
            <WideLegend
              legendList={pieChartLegendList}
              etcOptions={{ title: "기타", numItemsFromFront: 10 }}
            />
          ))}
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

const ChartLabel = styled.h1<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.letterSpacing
      : designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;
