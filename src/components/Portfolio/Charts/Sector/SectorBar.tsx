import { PortfolioHoldingsSectorBarItem } from "@api/portfolio/types";
import { chartColorPalette } from "@styles/chartColorPalette";
import styled from "styled-components";
import SectorBarItem from "./SectorBarItem";

type Props = {
  data: PortfolioHoldingsSectorBarItem[];
  sectorBarWidth: number;
};

export default function SectorBar({ data, sectorBarWidth }: Props) {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  return (
    <StyledSectorBar $sectorBarWidth={sectorBarWidth}>
      {coloredData.map((d, index) => (
        <SectorBarItem
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
