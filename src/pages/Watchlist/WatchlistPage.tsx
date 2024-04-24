import WatchlistContainer from "@components/Watchlist/WatchlistTable/WatchlistContainer";
import WatchlistTableErrorFallback from "@components/Watchlist/errorFallback/WatchlistTableErrorFallback";
import { WatchlistsPageSkeleton } from "@components/Watchlist/skeletons/WatchlistsPageSkeleton";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import BasePage from "../BasePage";

export default function WatchlistPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={WatchlistTableErrorFallback}
        SuspenseFallback={<WatchlistsPageSkeleton />}>
        <WatchlistContainer />
      </AsyncBoundary>
    </BasePage>
  );
}
