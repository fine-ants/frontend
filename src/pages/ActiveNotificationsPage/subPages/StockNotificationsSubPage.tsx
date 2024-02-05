import StockNotificationListTable from "@components/Notification/StockNotificationList/StockNotificationListTable";
import styled from "styled-components";

export type StockNotification = {
  companyName: string;
  tickerSymbol: string;
  targetPrices: { notificationId: number; targetPrice: number }[];
  lastPrice: number;
  lastUpdated: string;
};

const data = [
  {
    companyName: "삼성전자",
    tickerSymbol: "005930",
    targetPrices: [
      {
        notificationId: 1,
        targetPrice: 80000,
      },
      {
        notificationId: 2,
        targetPrice: 90000,
      },
    ],
    lastPrice: 80000,
    lastUpdated: "2024-01-29T10:10:10",
  },
  {
    companyName: "카카오",
    tickerSymbol: "035720",
    targetPrices: [
      {
        notificationId: 3,
        targetPrice: 150000,
      },
    ],
    lastPrice: 150000,
    lastUpdated: "2024-01-28T10:10:10",
  },
];

export default function StockNotificationsSubPage() {
  return (
    <StyledStockNotificationsSubPage>
      <StockNotificationListTable data={data} />
    </StyledStockNotificationsSubPage>
  );
}

const StyledStockNotificationsSubPage = styled.div`
  margin-top: 40px;
`;
