import { Skeleton } from "@mui/material";
import styled from "styled-components";

type Props = {
  size: number;
  innerSize: number;
};

export function PieChartSkeleton({ size, innerSize }: Props) {
  return (
    <StyledPieChartSkeleton>
      <Skeleton variant="circular" width={size} height={size} />
      <InnerCircle $width={innerSize} $height={innerSize} />
    </StyledPieChartSkeleton>
  );
}

const StyledPieChartSkeleton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InnerCircle = styled.div<{
  $width: number;
  $height: number;
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #ffffff;
`;
