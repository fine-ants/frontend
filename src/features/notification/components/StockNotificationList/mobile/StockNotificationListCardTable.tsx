import { PlainCardTable } from "@components/CardTable/PlainCardTable/PlainCardTable";
import { StockNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { StockNotificationCardBody } from "./StockNotificationCardBody";

type Props = {
  data: StockNotification[];
};

export function StockNotificationListCardTable({ data }: Props) {
  return (
    <PlainCardTable
      data={data}
      CardBody={StockNotificationCardBody}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
