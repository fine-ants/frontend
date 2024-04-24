import { PieChartSkeleton } from "@components/common/PieChart/skeletons/PieChartSkeleton";
import { TallLegendSkeleton } from "@components/common/PieChart/skeletons/TallLegendSkeleton";
import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function DashboardPieChartSkeleton() {
  return (
    <StyledDashboardPieChartSkeleton>
      <Skeleton variant="rounded" width={"100%"} height={29} />
      <Wrapper>
        <PieChartSkeletonWrapper>
          <PieChartSkeleton size={288} innerSize={160} />
        </PieChartSkeletonWrapper>
        <TallLegendSkeleton />
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
  display: flex;
  justify-content: space-between;
`;

const PieChartSkeletonWrapper = styled.div`
  width: 320px;
  height: 320px;
`;
