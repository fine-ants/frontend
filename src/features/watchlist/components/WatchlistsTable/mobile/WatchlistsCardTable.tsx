import SelectableCardTable from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { WatchlistsType } from "@features/watchlist/api";
import EmptyWatchlistsTable from "../EmptyWatchlistsTable";
import WatchlistsCardBody from "./WatchlistsCardBody";
import WatchlistsCardTableToolbar from "./WatchlistsCardTableToolbar";

type Props = {
  data: WatchlistsType[];
};

export default function WatchlistsCardTable({ data }: Props) {
  return (
    <SelectableCardTable
      CardBody={WatchlistsCardBody}
      CardTableToolbar={WatchlistsCardTableToolbar}
      EmptyComponent={EmptyWatchlistsTable}
      data={data}
      initialOrderBy="id"
      orderByList={orderByList}
    />
  );
}

const orderByList: { title: string; orderBy: keyof WatchlistsType }[] = [
  { title: "이름", orderBy: "name" },
];
