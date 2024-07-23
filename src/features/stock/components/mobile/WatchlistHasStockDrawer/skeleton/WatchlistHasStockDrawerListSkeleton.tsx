import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function WatchlistHasStockDrawerListSkeleton() {
  return (
    <StyledWatchlistHasStockDrawerListSkeleton>
      <RowSkeleton variant="rounded" />
      <RowSkeleton variant="rounded" />
      <RowSkeleton variant="rounded" />
    </StyledWatchlistHasStockDrawerListSkeleton>
  );
}

const StyledWatchlistHasStockDrawerListSkeleton = styled.div`
  width: 100%;
  height: 100%;
  padding-inline: 16px;
`;

const RowSkeleton = styled(Skeleton)`
  height: 56px;

  &:not(:last-child) {
    border-bottom: 1px solid ${designSystem.color.neutral.gray100};
  }
`;
