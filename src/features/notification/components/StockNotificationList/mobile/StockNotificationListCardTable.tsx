import { CardTable } from "@components/Card/CardTable";
import { StockNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { StockNotificationCardList } from "./StockNotificationCardList";

type Props = {
  data: StockNotification[];
};

export function StockNotificationListCardTable({ data }: Props) {
  return (
    <CardTable
      data={data}
      CardList={StockNotificationCardList}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
