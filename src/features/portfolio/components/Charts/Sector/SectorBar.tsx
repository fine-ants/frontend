import { PortfolioHoldingsSectorBarItem } from "@features/portfolio/api/types";
import { chartColorPalette } from "@styles/chartColorPalette";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import SectorBarItem from "./SectorBarItem";

type Props = {
  data: PortfolioHoldingsSectorBarItem[];
  sectorBarWidth: number;
  hasNoHoldings: boolean;
};

export default function SectorBar({
  data,
  sectorBarWidth,
  hasNoHoldings,
}: Props) {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  return (
    <StyledSectorBar $sectorBarWidth={sectorBarWidth}>
      {hasNoHoldings ? (
        <SectorBarItem
          title="No Holdings"
          fill={designSystem.color.primary.blue50}
          weight={100}
          sectorBarWidth={400}
        />
      ) : (
        coloredData.map((d, index) => (
          <SectorBarItem
            key={index}
            title={d.sector}
            fill={d.fill}
            weight={d.sectorWeight}
            sectorBarWidth={400 - (coloredData.length - 1) * 2}
          />
        ))
      )}
    </StyledSectorBar>
  );
}

const StyledSectorBar = styled.div<{ $sectorBarWidth: number }>`
  display: flex;
  gap: 2px;
  width: ${({ $sectorBarWidth }) => $sectorBarWidth}px;
  overflow: hidden;
`;
