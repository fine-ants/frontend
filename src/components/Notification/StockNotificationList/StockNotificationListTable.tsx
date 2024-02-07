import useStockNotificationSettingsQuery from "@api/notifications/queries/useStockNotificationSettingsQuery";
import CollapsibleTable from "@components/common/Table/CollapsibleTable";
import EmptyNotificationListTable from "../EmptyNotificationListTable";
import StockNotificationListTableBody from "./StockNotificationListTableBody";
import StockNotificationListTableHead from "./StockNotificationListTableHead";

export default function StockNotificationListTable() {
  const { data } = useStockNotificationSettingsQuery();

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
