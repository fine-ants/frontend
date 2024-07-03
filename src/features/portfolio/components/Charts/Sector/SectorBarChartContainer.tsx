import TallLegend from "@components/Legend/TallLegend";
import WideLegend from "@components/Legend/WideLegend";
import { PortfolioHoldingsSectorBarItem } from "@features/portfolio/api/types";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import SectorBar from "./SectorBar";

type Props = {
  sectorChart: PortfolioHoldingsSectorBarItem[];
  sectorLegendList: {
    title: string;
    percent: number;
    color: string;
  }[];
};
export default function SectorBarChartContainer({
  sectorChart,
  sectorLegendList,
}: Props) {
  const { isMobile } = useResponsiveLayout();
  const hasNoHoldings =
    sectorChart.length === 1 && sectorChart[0].sector === "현금";

  const sectorBarWidth = isMobile ? window.innerWidth - 32 : 400;

  return (
    <StyledSectorBarChartContainer>
      <ChartLabel $isMobile={isMobile}>섹터 구성</ChartLabel>
      <SectorBar
        hasNoHoldings={hasNoHoldings}
        sectorBarWidth={sectorBarWidth}
        data={sectorChart}
      />

      {!hasNoHoldings &&
        (isMobile ? (
          <TallLegend
            legendList={sectorLegendList}
            etcOptions={{ title: "기타", numItemsFromFront: 10 }}
          />
        ) : (
          <WideLegend
            style={{ height: "68px" }}
            legendList={sectorLegendList}
            etcOptions={{ title: "기타", numItemsFromFront: 10 }}
          />
        ))}
    </StyledSectorBarChartContainer>
  );
}

const StyledSectorBarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
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
