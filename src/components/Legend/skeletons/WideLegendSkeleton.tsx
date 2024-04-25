import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  height: number;
  itemLength: number;
};

export function WideLegendSkeleton({ height, itemLength }: Props) {
  return (
    <StyledWideLegendSkeleton $height={height}>
      {Array.from({ length: itemLength }, (_, index) => (
        <LegendItemSkeleton key={index} />
      ))}
    </StyledWideLegendSkeleton>
  );
}

function LegendItemSkeleton() {
  return (
    <ItemWrapper>
      <Skeleton variant="rounded" width={10} height={10} />
      <Skeleton variant="rounded" width={50} height={18} />
      <Skeleton variant="rounded" width={25} height={18} />
    </ItemWrapper>
  );
}

const StyledWideLegendSkeleton = styled.div<{ $height: number }>`
  width: 400px;
  height: ${({ $height }) => `${$height}px`};
  padding: 16px 8px 16px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  box-sizing: border-box;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 105px;
  height: 18px;
`;
