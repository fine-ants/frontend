import { Skeleton } from "@mui/material";
import styled from "styled-components";

type Props = {
  containerWidth: number;
  containerHeight: number;
  pieWidth: number;
  pieHeight: number;
  innerCircleWidth?: number;
  innerCircleHeight?: number;
};

export default function PieChartSkeleton({
  containerWidth,
  containerHeight,
  pieWidth,
  pieHeight,
  innerCircleWidth,
  innerCircleHeight,
}: Props) {
  return (
    <StyledPieChartSkeleton
      $containerWidth={containerWidth}
      $containerHeight={containerHeight}>
      <Skeleton variant="circular" width={pieWidth} height={pieHeight} />
      {innerCircleWidth && innerCircleHeight && (
        <InnerCircle
          $innerCircleWidth={innerCircleWidth}
          $innerCircleHeight={innerCircleHeight}
        />
      )}
      {/* TODO: Legend Skeleton */}
    </StyledPieChartSkeleton>
  );
}

const StyledPieChartSkeleton = styled.div<{
  $containerWidth: number;
  $containerHeight: number;
}>`
  width: ${({ $containerWidth }) => $containerWidth}px;
  height: ${({ $containerHeight }) => $containerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0px 0px 12px 0px #00000014;
`;

const InnerCircle = styled.div<{
  $innerCircleWidth: number;
  $innerCircleHeight: number;
}>`
  width: ${({ $innerCircleWidth }) => $innerCircleWidth}px;
  height: ${({ $innerCircleHeight }) => $innerCircleHeight}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #ffffff;
`;
