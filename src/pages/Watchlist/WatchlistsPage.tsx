import WatchlistsTable from "@components/Watchlist/WatchlistsTable/WatchlistsTable";
import WatchlistTableErrorFallback from "@components/Watchlist/errorFallback/WatchlistTableErrorFallback";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import TableSkeleton from "@components/common/Table/TableSkeleton";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function WatchlistsPage() {
  return (
    <BasePage>
      <Container>
        <Header>
          <h1>전체 관심 종목 리스트</h1>
        </Header>

        <AsyncBoundary
          ErrorFallback={WatchlistTableErrorFallback}
          SuspenseFallback={<TableSkeleton />}>
          <WatchlistsTable />
        </AsyncBoundary>
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 796px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 36px;
  display: flex;
  justify-content: space-between;

  h1 {
    font: ${designSystem.font.heading2.font};
    letter-spacing: ${designSystem.font.heading2.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
