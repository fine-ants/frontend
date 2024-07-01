import { AsyncBoundary } from "@components/AsyncBoundary";
import Watchlist from "@features/watchlist/components/WatchlistTable/Watchlist";
import WatchlistTableErrorFallback from "@features/watchlist/components/errorFallback/WatchlistTableErrorFallback";
import { WatchlistsPageSkeleton } from "@features/watchlist/components/skeletons/WatchlistsPageSkeleton";
import BasePage from "./BasePage";

export default function WatchlistPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={WatchlistTableErrorFallback}
        SuspenseFallback={<WatchlistsPageSkeleton />}>
        <Watchlist />
      </AsyncBoundary>
    </BasePage>
  );
}
