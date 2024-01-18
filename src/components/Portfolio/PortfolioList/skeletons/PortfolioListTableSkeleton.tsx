import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function PortfolioListTableSkeleton() {
  return (
    <StyledPortfolioListTableSkeleton>
      <PortfolioListTableToolBarSkeleton variant="rounded" />

      <PortfolioListTableHeadSkeleton variant="rounded" />

      {Array.from({ length: 5 }).map((_, idx) => (
        <PortfolioListTableRowSkeleton key={idx} variant="rectangular" />
      ))}

      <PortfolioListTablePaginationSkeleton variant="rectangular" />
    </StyledPortfolioListTableSkeleton>
  );
}

const StyledPortfolioListTableSkeleton = styled.div`
  width: 100%;
`;

const PortfolioListTableToolBarSkeleton = styled(Skeleton)`
  width: 100%;
  height: 32px;
  margin-bottom: 16px;
`;

const PortfolioListTableHeadSkeleton = styled(Skeleton)`
  width: 100%;
  height: 48px;
  margin-bottom: 8px;
`;

const PortfolioListTableRowSkeleton = styled(Skeleton)`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
`;

const PortfolioListTablePaginationSkeleton = styled(Skeleton)`
  width: 100%;
  height: 24px;
  margin-top: 16px;
`;
