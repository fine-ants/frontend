import SelectableCardTable from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { WatchlistItemType } from "@features/watchlist/api";
import EmptyWatchlistTable from "../EmptyWatchlistTable";
import WatchlistCardBody from "./WatchlistCardBody";
import WatchlistCardTableToolbar from "./WatchlistCardTableToolbar";

type Props = {
  data: WatchlistItemType[];
};

export function WatchlistCardTable({ data }: Props) {
  const orderByList: { title: string; orderBy: keyof WatchlistItemType }[] = [
    {
      title: "종목명",
      orderBy: "companyName",
    },
    {
      title: "현재가",
      orderBy: "currentPrice",
    },
    {
      title: "변동률",
      orderBy: "dailyChangeRate",
    },
    {
      title: "배당률",
      orderBy: "annualDividendYield",
    },
    {
      title: "섹터",
      orderBy: "sector",
    },
  ];

  return (
    <>
      <SelectableCardTable
        CardBody={WatchlistCardBody}
        CardTableToolbar={WatchlistCardTableToolbar}
        EmptyComponent={EmptyWatchlistTable}
        data={data}
        initialOrderBy="id"
        orderByList={orderByList}
      />
    </>
  );
}
