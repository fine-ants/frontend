import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  tableToolBar?: boolean;
  tablePagination?: boolean;
  tableToolBarHeight?: number;
  tableHeadHeight?: number;
  tableRowHeight?: number;
  tablePaginationHeight?: number;
};

export default function TableSkeleton({
  tableToolBar = true,
  tablePagination = true,
  tableToolBarHeight = 32,
  tableHeadHeight = 48,
  tableRowHeight = 64,
  tablePaginationHeight = 24,
}: Props) {
  return (
    <StyledTableSkeleton>
      {tableToolBar && (
        <TableToolBarSkeleton
          variant="rounded"
          $tableToolBarHeight={tableToolBarHeight}
        />
      )}

      <TableHeadSkeleton variant="rounded" $tableHeadHeight={tableHeadHeight} />

      {Array.from({ length: 5 }).map((_, idx) => (
        <TableRowSkeleton
          key={idx}
          variant="rectangular"
          $tableRowHeight={tableRowHeight}
        />
      ))}

      {tablePagination && (
        <TablePaginationSkeleton
          variant="rectangular"
          $tablePaginationHeight={tablePaginationHeight}
        />
      )}
    </StyledTableSkeleton>
  );
}

const StyledTableSkeleton = styled.div`
  width: 100%;
`;

const TableToolBarSkeleton = styled(Skeleton)<{
  $tableToolBarHeight: number;
}>`
  width: 100%;
  height: ${({ $tableToolBarHeight }) => $tableToolBarHeight}px;
  margin-bottom: 16px;
`;

const TableHeadSkeleton = styled(Skeleton)<{ $tableHeadHeight: number }>`
  width: 100%;
  height: ${({ $tableHeadHeight }) => $tableHeadHeight}px;
  margin-bottom: 8px;
`;

const TableRowSkeleton = styled(Skeleton)<{ $tableRowHeight: number }>`
  width: 100%;
  height: ${({ $tableRowHeight }) => $tableRowHeight}px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const TablePaginationSkeleton = styled(Skeleton)<{
  $tablePaginationHeight: number;
}>`
  width: 100%;
  height: ${({ $tablePaginationHeight }) => $tablePaginationHeight}px;
  margin-top: 16px;
`;
