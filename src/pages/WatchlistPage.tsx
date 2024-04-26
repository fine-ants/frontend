import { AsyncBoundary } from "@components/AsyncBoundary";
import WatchlistContainer from "@features/watchlist/components/WatchlistTable/WatchlistContainer";
import WatchlistTableErrorFallback from "@features/watchlist/components/errorFallback/WatchlistTableErrorFallback";
import { WatchlistsPageSkeleton } from "@features/watchlist/components/skeletons/WatchlistsPageSkeleton";
import BasePage from "./BasePage";

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
