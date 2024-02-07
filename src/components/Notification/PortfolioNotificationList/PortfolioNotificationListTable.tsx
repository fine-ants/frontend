import usePortfolioNotificationsQuery from "@api/notifications/queries/usePortfolioNotificationSettingsQuery";
import PlainTable from "@components/common/Table/PlainTable";
import EmptyNotificationListTable from "../EmptyNotificationListTable";
import PortfolioNotificationListTableBody from "./PortfolioNotificationListTableBody";
import PortfolioNotificationListTableHead from "./PortfolioNotificationListTableHead";

export default function PortfolioNotificationListTable() {
  const { data } = usePortfolioNotificationsQuery();

  return (
    <PlainTable
      tableTitle="활성 포트폴리오 알림 목록"
      initialOrderBy="lastUpdated"
      TableHead={PortfolioNotificationListTableHead}
      TableBody={PortfolioNotificationListTableBody}
      EmptyTable={EmptyNotificationListTable}
      data={data}
    />
  );
}
