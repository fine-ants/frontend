import { PlainCardTable } from "@components/CardTable/PlainCardTable/PlainCardTable";
import { PortfolioNotification } from "@features/notification/api/types";
import EmptyNotificationList from "../../EmptyNotificationList";
import { PortfolioNotificationCardList } from "./PortfolioNotificationCardList";

type Props = {
  data: PortfolioNotification[];
};

export function PortfolioNotificationListCardTable({ data }: Props) {
  return (
    <PlainCardTable
      data={data}
      CardList={PortfolioNotificationCardList}
      EmptyComponent={EmptyNotificationList}
    />
  );
}
