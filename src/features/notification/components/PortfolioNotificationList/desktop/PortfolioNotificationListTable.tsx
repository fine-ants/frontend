import PlainTable from "@components/Table/PlainTable";
import { PortfolioNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import PortfolioNotificationListTableBody from "./PortfolioNotificationListTableBody";
import PortfolioNotificationListTableHead from "./PortfolioNotificationListTableHead";

type Props = {
  data: PortfolioNotification[];
};

export default function PortfolioNotificationListTable({ data }: Props) {
  return (
    <PlainTable
      tableTitle="활성 포트폴리오 알림 목록"
      initialOrderBy="createdAt"
      TableHead={PortfolioNotificationListTableHead}
      TableBody={PortfolioNotificationListTableBody}
      EmptyTable={EmptyNotificationList}
      data={data}
    />
  );
}
