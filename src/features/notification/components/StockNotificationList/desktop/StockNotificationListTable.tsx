import CollapsibleTable from "@components/Table/CollapsibleTable";
import { StockNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import StockNotificationListTableBody from "./StockNotificationListTableBody";
import StockNotificationListTableHead from "./StockNotificationListTableHead";

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
      EmptyTable={EmptyNotificationList}
      data={data}
    />
  );
}
