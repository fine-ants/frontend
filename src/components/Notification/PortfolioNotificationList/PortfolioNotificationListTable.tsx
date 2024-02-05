import PlainTable from "@components/common/Table/PlainTable";
import EmptyNotificationListTable from "../EmptyNotificationListTable";
import PortfolioNotificationListTableBody from "./PortfolioNotificationListTableBody";
import PortfolioNotificationListTableHead from "./PortfolioNotificationListTableHead";

// TODO: move type to api
export type PortfolioNotification = {
  portfolioId: number;
  name: string;
  targetGainNotify: boolean;
  maxLossNotify: boolean;
  lastUpdated: string;
};

type Props = {
  data: PortfolioNotification[];
};

export default function PortfolioNotificationListTable({ data }: Props) {
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
