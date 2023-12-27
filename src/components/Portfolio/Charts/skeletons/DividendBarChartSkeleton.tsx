import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function DividendBarChartSkeleton() {
  return (
    <StyledDividendBarChartSkeleton>
      <BarsContainer>
        {Array.from({ length: 12 }).map((_, idx) => (
          <BarSkeleton key={idx} variant="rectangular" />
        ))}
      </BarsContainer>
    </StyledDividendBarChartSkeleton>
  );
}

const StyledDividendBarChartSkeleton = styled.div`
  width: 400px;
  height: 234px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;

const BarsContainer = styled.div`
  width: 390px;
  height: 188px;
  gap: 18px;
  display: flex;
  justify-content: space-between;
`;

const BarSkeleton = styled(Skeleton)`
  width: 16px;
  height: 180px;
  border-radius: 4px;
  background-color: ${({ theme: { color } }) => color.primary.blue50};
`;
