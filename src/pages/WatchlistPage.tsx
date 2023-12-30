import WatchlistTable from "@components/Watchlist/WatchlistTable";
import WatchlistTableErrorFallback from "@components/Watchlist/errorFallback/WatchlistTableErrorFallback";
import WatchlistTableSkeleton from "@components/Watchlist/skeletons/WatchlistTableSkeleton";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function WatchlistPage() {
  return (
    <BasePage>
      <Container>
        <Header>
          <h1>관심 목록</h1>
        </Header>

        <AsyncBoundary
          ErrorFallback={WatchlistTableErrorFallback}
          SuspenseFallback={<WatchlistTableSkeleton />}>
          <WatchlistTable />
        </AsyncBoundary>
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
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
    font: ${({ theme: { font } }) => font.heading2};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
