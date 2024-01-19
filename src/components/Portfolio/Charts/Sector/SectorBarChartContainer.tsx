import { PortfolioHoldingsSectorBarItem } from "@api/portfolio/types";
import WideLegend from "@components/common/Legend/WideLegend";
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
  const hasNoHoldings =
    sectorChart.length === 1 && sectorChart[0].sector === "현금";

  return (
    <StyledSectorBarChartContainer>
      <ChartLabel>섹터 구성</ChartLabel>
      <SectorBar
        hasNoHoldings={hasNoHoldings}
        sectorBarWidth={400}
        data={sectorChart}
      />
      {!hasNoHoldings && (
        <WideLegend
          style={{ height: "68px" }}
          legendList={sectorLegendList}
          etcOptions={{ title: "기타", numItemsFromFront: 10 }}
        />
      )}
    </StyledSectorBarChartContainer>
  );
}

const StyledSectorBarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
`;

const ChartLabel = styled.h1`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;
