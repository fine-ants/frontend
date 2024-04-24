import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function DividendBarChartSkeleton() {
  return (
    <StyledDividendBarChartSkeleton>
      <BarsContainer>
        {Array.from({ length: 12 }).map((_, index) => (
          <BarSkeleton key={index} variant="rectangular" />
        ))}
      </BarsContainer>
      <Skeleton variant="rounded" width="100%" height={2} />
      <MonthContainer style={{ width: "100%", justifyContent: "center" }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" width={18} height={16} />
        ))}
      </MonthContainer>
      <div style={{ justifyContent: "space-between" }} />
    </StyledDividendBarChartSkeleton>
  );
}

const StyledDividendBarChartSkeleton = styled.div`
  width: 400px;
  height: 234px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  padding: 0 5px;
`;

const BarsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 6px;
  margin-bottom: 2px;
`;

const MonthContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
`;

const BarSkeleton = styled(Skeleton)`
  width: 16px;
  height: 184px;
  border-radius: 4px;
  background-color: ${({ theme: { color } }) => color.primary.blue50};
`;
