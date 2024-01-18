import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function WatchlistTableSkeleton() {
  return (
    <StyledWatchlistTableSkeleton>
      <WatchlistTableToolBarSkeleton variant="rounded" />

      <WatchlistTableHeadSkeleton variant="rounded" />

      {Array.from({ length: 5 }).map((_, idx) => (
        <WatchlistTableRowSkeleton key={idx} variant="rectangular" />
      ))}

      <WatchlistTablePaginationSkeleton variant="rectangular" />
    </StyledWatchlistTableSkeleton>
  );
}

const StyledWatchlistTableSkeleton = styled.div`
  width: 100%;
`;

const WatchlistTableToolBarSkeleton = styled(Skeleton)`
  width: 100%;
  height: 32px;
  margin-bottom: 16px;
`;

const WatchlistTableHeadSkeleton = styled(Skeleton)`
  width: 100%;
  height: 48px;
  margin-bottom: 8px;
`;

const WatchlistTableRowSkeleton = styled(Skeleton)`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
`;

const WatchlistTablePaginationSkeleton = styled(Skeleton)`
  width: 100%;
  height: 24px;
  margin-top: 16px;
`;
