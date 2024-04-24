import TableSkeleton from "@components/common/Table/TableSkeleton";
import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function WatchlistsPageSkeleton() {
  return (
    <Container>
      <TitleContainer>
        <Skeleton variant="rounded" width={"100%"} height={17} />
        <Skeleton variant="rounded" width={"100%"} height={39} />
      </TitleContainer>
      <TableSkeleton />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
`;

const TitleContainer = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;
