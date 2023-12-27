import { PortfolioHoldingsSectorBarItem } from "@api/portfolio/types";
import { chartColorPalette } from "@styles/chartColorPalette";
import styled from "styled-components";
import SectorBarElement from "./SectorBarElement";

type Props = {
  data: PortfolioHoldingsSectorBarItem[];
  sectorBarWidth: number;
  onHoverSectorBarElement: (
    sector: string,
    sectorWeight: number,
    color: string,
    sectorBarPosition: {
      x: number;
      y: number;
    }
  ) => void;
};

export default function SectorBar({ data, sectorBarWidth }: Props) {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  return (
    <StyledSectorBar $sectorBarWidth={sectorBarWidth}>
      {coloredData.map((d, index) => (
        <SectorBarElement
          key={index}
          title={d.sector}
          fill={d.fill}
          weight={d.sectorWeight}
        />
      ))}
    </StyledSectorBar>
  );
}

const StyledSectorBar = styled.div<{ $sectorBarWidth: number }>`
  display: flex;
  gap: 2px;
  width: ${({ $sectorBarWidth }) => $sectorBarWidth}px;
  overflow: hidden;
`;
