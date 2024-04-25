import SelectableTable from "@components/Table/SelectableTable";
import { WatchlistItemType } from "@features/watchlist/api";
import EmptyWatchlistTable from "./EmptyWatchlistTable";
import WatchlistTableBody from "./WatchlistTableBody";
import WatchlistTableHead from "./WatchlistTableHead";
import WatchlistTableToolBar from "./WatchlistTableToolBar";

type Props = {
  data: WatchlistItemType[];
};

export default function WatchlistTable({ data }: Props) {
  return (
    <SelectableTable
      tableTitle="관심 종목"
      initialOrderBy="dateAdded"
      TableToolBar={WatchlistTableToolBar}
      TableHead={WatchlistTableHead}
      TableBody={WatchlistTableBody}
      EmptyTable={EmptyWatchlistTable}
      data={data}
    />
  );
}
