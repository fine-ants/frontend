import { Skeleton } from "@mui/material";
import styled from "styled-components";

export function DashboardLineChartSkeleton() {
  return (
    <StyledDashboardLineChartSkeleton>
      <Skeleton variant="rounded" width={"100%"} height={29} />
      <StyledDiv>
        <Skeleton variant="rounded" width={264} height={32} />
      </StyledDiv>
      <Skeleton variant="rounded" width={644} height={327} />
    </StyledDashboardLineChartSkeleton>
  );
}

const StyledDashboardLineChartSkeleton = styled.div`
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

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;
