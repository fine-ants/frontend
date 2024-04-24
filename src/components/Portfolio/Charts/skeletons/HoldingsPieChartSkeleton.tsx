import { PieChartSkeleton } from "@components/common/PieChart/skeletons/PieChartSkeleton";
import styled from "styled-components";

export default function HoldingsPieChartSkeleton() {
  return (
    <PieChartWrapper>
      <PieChartSkeleton size={230} innerSize={128} />
    </PieChartWrapper>
  );
}

const PieChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 256px;
  height: 256px;
`;
