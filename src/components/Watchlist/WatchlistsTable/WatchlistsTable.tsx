import useWatchlistsQuery from "@api/watchlist/queries/useWatchlistsQuery";
import Table from "@components/common/Table/Table";
import EmptyWatchlistsTable from "./EmptyWatchlistsTable";
import WatchlistsTableBody from "./WatchlistsTableBody";
import WatchlistsTableHead from "./WatchlistsTableHead";
import WatchlistsTableToolBar from "./WatchlistsTableToolBar";

export default function WatchlistsTable() {
  const { data: watchlistsData } = useWatchlistsQuery();

  return (
    <Table
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
