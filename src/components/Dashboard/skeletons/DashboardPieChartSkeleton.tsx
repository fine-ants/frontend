import { Skeleton } from "@mui/material";
import styled from "styled-components";
import { PieChartLegendSkeleton } from "./PieChartLegendSkeleton";
import { PieChartSkeleton } from "./PieChartSkeleton";

export default function DashboardPieChartSkeleton() {
  return (
    <StyledDashboardPieChartSkeleton>
      <Skeleton variant="rounded" width={"100%"} height={29} />
      <Wrapper>
        <PieChartSkeleton size={288} innerSize={160} />
        <PieChartLegendSkeleton />
      </Wrapper>
    </StyledDashboardPieChartSkeleton>
  );
}

const StyledDashboardPieChartSkeleton = styled.div`
  width: 50%;
  height: 480px;
  padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  gap: 24px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;
