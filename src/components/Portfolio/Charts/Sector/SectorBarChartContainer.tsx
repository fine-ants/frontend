import { PortfolioHoldingsSectorBarItem } from "@api/portfolio/types";
import WideLegend from "@components/common/Legend/WideLegend";
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
  return (
    <StyledSectorBarChartContainer>
      <ChartLabel>섹터 구성</ChartLabel>
      <SectorBar sectorBarWidth={400} data={sectorChart} />
      <WideLegend
        style={{ height: "68px" }}
        legendList={sectorLegendList}
        etcOptions={{ title: "기타", numItemsFromFront: 10 }}
      />
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
  font: ${({ theme: { font } }) => font.heading3};
`;
