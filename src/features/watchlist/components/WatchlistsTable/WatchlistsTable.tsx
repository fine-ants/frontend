import SelectableTable from "@components/Table/SelectableTable";
import useWatchlistsQuery from "@features/watchlist/api/queries/useWatchlistsQuery";
import EmptyWatchlistsTable from "./EmptyWatchlistsTable";
import WatchlistsTableBody from "./WatchlistsTableBody";
import WatchlistsTableHead from "./WatchlistsTableHead";
import WatchlistsTableToolBar from "./WatchlistsTableToolBar";

export default function WatchlistsTable() {
  const { data: watchlistsData } = useWatchlistsQuery();

  return (
    <SelectableTable
      tableTitle="관심 종목 목록"
      initialOrderBy="id"
      TableToolBar={WatchlistsTableToolBar}
      TableHead={WatchlistsTableHead}
      TableBody={WatchlistsTableBody}
      EmptyTable={EmptyWatchlistsTable}
      data={watchlistsData}
    />
  );
}
