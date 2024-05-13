import { Cards } from "@components/Card/Card";
import { StockNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { StockNotificationCardList } from "./StockNotificationCardList";

type Props = {
  data: StockNotification[];
};

export function StockNotificationListCards({ data }: Props) {
  return (
    <Cards
      data={data}
      CardList={StockNotificationCardList}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
