import WatchlistContainer from "@components/Watchlist/WatchlistTable/WatchlistContainer";
import WatchlistTableErrorFallback from "@components/Watchlist/errorFallback/WatchlistTableErrorFallback";
import WatchlistTableSkeleton from "@components/Watchlist/skeletons/WatchlistTableSkeleton";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import BasePage from "../BasePage";

export default function WatchlistPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={WatchlistTableErrorFallback}
        SuspenseFallback={<WatchlistTableSkeleton />}>
        <WatchlistContainer />
      </AsyncBoundary>
    </BasePage>
  );
}
