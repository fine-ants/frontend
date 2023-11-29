import DividendBarChartSkeleton from "@components/Portfolio/Charts/skeletons/DividendBarChartSkeleton";
import HoldingsPieChartSkeleton from "@components/Portfolio/Charts/skeletons/HoldingsPieChartSkeleton";
import SectorBarSkeleton from "@components/Portfolio/Charts/skeletons/SectorBarSkeleton";
import styled from "styled-components";

export default function ChartsPanelSkeleton() {
  return (
    <StyledChartsPanelSkeleton>
      <HoldingsPieChartSkeleton />
      <DividendBarChartSkeleton />
      <SectorBarSkeleton />
    </StyledChartsPanelSkeleton>
  );
}

const StyledChartsPanelSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
