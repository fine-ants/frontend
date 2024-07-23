import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function WatchlistHasStockListSkeleton() {
  return (
    <StyledWatchlistHasStockListSkeleton>
      <RowSkeleton variant="rounded" />
      <RowSkeleton variant="rounded" />
      <RowSkeleton variant="rounded" />
    </StyledWatchlistHasStockListSkeleton>
  );
}

const StyledWatchlistHasStockListSkeleton = styled.div`
  width: 336px;
  display: flex;
  flex-direction: column;
`;

const RowSkeleton = styled(Skeleton)`
  height: 32px;

  &:not(:last-child) {
    border-bottom: 1px solid ${designSystem.color.neutral.gray100};
  }
`;
