import CollapsibleTable from "@components/common/Table/CollapsibleTable";
import EmptyNotificationListTable from "../EmptyNotificationListTable";
import StockNotificationListTableBody from "./StockNotificationListTableBody";
import StockNotificationListTableHead from "./StockNotificationListTableHead";

// TODO: move type to api
export type StockNotification = {
  companyName: string;
  tickerSymbol: string;
  targetPrices: StockTargetPrice[];
  lastPrice: number;
  lastUpdated: string;
};

export type StockTargetPrice = {
  notificationId: number;
  targetPrice: number;
  dateAdded: string;
};

type Props = {
  data: StockNotification[];
};

export default function StockNotificationListTable({ data }: Props) {
  return (
    <CollapsibleTable
      tableTitle="활성 종목 알림 목록"
      initialOrderBy="lastUpdated"
      TableHead={StockNotificationListTableHead}
      TableBody={StockNotificationListTableBody}
      EmptyTable={EmptyNotificationListTable}
      data={data}
    />
  );
}
