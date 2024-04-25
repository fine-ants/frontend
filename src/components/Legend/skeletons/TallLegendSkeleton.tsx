import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function TallLegendSkeleton() {
  const legend = Array.from({ length: 10 }, (_, idx) => {
    return <LegendSkeleton key={idx} />;
  });

  const otherLegend = Array.from({ length: 2 }, (_, idx) => {
    return <LegendSkeleton key={idx} />;
  });

  return (
    <StyledTallLegendSkeleton>
      {legend}
      <Skeleton width={"100%"} height={3} />
      {otherLegend}
    </StyledTallLegendSkeleton>
  );
}

function LegendSkeleton() {
  return (
    <Wrapper>
      <Skeleton variant="rounded" width={206} height={17} />
      <Skeleton variant="rounded" width={30} height={15} />
    </Wrapper>
  );
}

const StyledTallLegendSkeleton = styled.div`
  display: flex;
  width: 300px;
  height: 363px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  gap: 8px;
  flex-shrink: 0;
  border: 1px solid ${designSystem.color.neutral.gray200};
  background: ${designSystem.color.neutral.white};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;
