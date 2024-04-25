import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function TargetPricesListSkeleton() {
  return (
    <StyledTargetPricesListSkeleton>
      <RowSkeleton variant="rounded" />
      <RowSkeleton variant="rounded" />
    </StyledTargetPricesListSkeleton>
  );
}

const StyledTargetPricesListSkeleton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RowSkeleton = styled(Skeleton)`
  height: 24px;
`;
