import { CardTable } from "@components/Card/CardTable";
import { PortfolioNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { PortfolioNotificationCardList } from "./PortfolioNotificationCardList";

type Props = {
  data: PortfolioNotification[];
};

export function PortfolioNotificationListCardTable({ data }: Props) {
  return (
    <CardTable
      data={data}
      CardList={PortfolioNotificationCardList}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
