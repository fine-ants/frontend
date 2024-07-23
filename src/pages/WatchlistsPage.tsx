import { AsyncBoundary } from "@components/AsyncBoundary";
import TableSkeleton from "@components/Table/TableSkeleton";
import Watchlists from "@features/watchlist/components/WatchlistsTable/Watchlists";
import WatchlistTableErrorFallback from "@features/watchlist/components/errorFallback/WatchlistTableErrorFallback";
import BasePage from "./BasePage";

export default function WatchlistsPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={WatchlistTableErrorFallback}
        SuspenseFallback={<TableSkeleton />}>
        <Watchlists />
      </AsyncBoundary>
    </BasePage>
  );
}
