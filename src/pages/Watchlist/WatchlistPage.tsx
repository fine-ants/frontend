import WatchlistContainer from "@components/Watchlist/WatchlistTable/WatchlistContainer";
import WatchlistTableErrorFallback from "@components/Watchlist/errorFallback/WatchlistTableErrorFallback";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import TableSkeleton from "@components/common/Table/TableSkeleton";
import BasePage from "../BasePage";

export default function WatchlistPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={WatchlistTableErrorFallback}
        SuspenseFallback={<TableSkeleton />}>
        <WatchlistContainer />
      </AsyncBoundary>
    </BasePage>
  );
}
