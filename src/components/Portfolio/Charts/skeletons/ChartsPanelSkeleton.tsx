import DividendBarChartSkeleton from "@components/Portfolio/Charts/skeletons/DividendBarChartSkeleton";
import HoldingsPieChartSkeleton from "@components/Portfolio/Charts/skeletons/HoldingsPieChartSkeleton";
import { WideLegendSkeleton } from "@components/common/PieChart/skeletons/WideLegendSkeleton";
import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function ChartsPanelSkeleton() {
  return (
    <StyledChartsPanelSkeleton>
      <SkeletonContainer>
        <ChartLabel>종목 구성</ChartLabel>
        <Wrapper>
          <HoldingsPieChartSkeleton />
          <WideLegendSkeleton height={120} itemLength={9} />
        </Wrapper>
      </SkeletonContainer>
      <SkeletonContainer>
        <ChartLabel>예상 월 배당금</ChartLabel>
        <DividendBarChartSkeleton />
      </SkeletonContainer>
      <SkeletonContainer>
        <ChartLabel>섹터 구성</ChartLabel>
        <Skeleton variant="rounded" width="100%" height={24} />
        <WideLegendSkeleton height={68} itemLength={6} />
      </SkeletonContainer>
    </StyledChartsPanelSkeleton>
  );
}

const StyledChartsPanelSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 464px;
  height: 1061px;
  padding: 32px;
  background-color: ${designSystem.color.neutral.white};
`;

const ChartLabel = styled.h1`
  margin-right: auto;
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
