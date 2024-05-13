import { Cards } from "@components/Card/Card";
import { PortfolioNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { PortfolioNotificationCardList } from "./PortfolioNotificationCardList";

type Props = {
  data: PortfolioNotification[];
};

export function PortfolioNotificationListCards({ data }: Props) {
  return (
    <Cards
      data={data}
      CardList={PortfolioNotificationCardList}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
