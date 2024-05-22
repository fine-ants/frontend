import { PlainCardTable } from "@components/CardTable/PlainCardTable/PlainCardTable";
import { StockNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { StockNotificationCardList } from "./StockNotificationCardList";

type Props = {
  data: StockNotification[];
};

export function StockNotificationListCardTable({ data }: Props) {
  return (
    <PlainCardTable
      data={data}
      CardList={StockNotificationCardList}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
