import SelectableTable from "@components/Table/SelectableTable";
import { WatchlistsType } from "@features/watchlist/api";
import EmptyWatchlistsTable from "../EmptyWatchlistsTable";
import WatchlistsTableBody from "./WatchlistsTableBody";
import WatchlistsTableHead from "./WatchlistsTableHead";
import WatchlistsTableToolBar from "./WatchlistsTableToolBar";

type Props = {
  data: WatchlistsType[];
};

export default function WatchlistsTable({ data }: Props) {
  return (
    <SelectableTable
      tableTitle="관심 종목 목록"
      initialOrderBy="id"
      TableToolBar={WatchlistsTableToolBar}
      TableHead={WatchlistsTableHead}
      TableBody={WatchlistsTableBody}
      EmptyTable={EmptyWatchlistsTable}
      data={data}
    />
  );
}
