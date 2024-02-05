import PortfolioNotificationListTable from "@components/Notification/PortfolioNotificationList/PortfolioNotificationListTable";
import styled from "styled-components";

const data = [
  {
    portfolioId: 1,
    name: "포트폴리오 1",
    targetGainNotify: true,
    maxLossNotify: true,
    lastUpdated: "2024-01-29T10:10:10",
  },
  {
    portfolioId: 2,
    name: "포트폴리오 2",
    targetGainNotify: true,
    maxLossNotify: false,
    lastUpdated: "2024-01-28T10:10:10",
  },
];

export default function PortfolioNotificationsSubPage() {
  return (
    <StyledPortfolioNotificationsSubPage>
      <PortfolioNotificationListTable data={data} />
    </StyledPortfolioNotificationsSubPage>
  );
}

const StyledPortfolioNotificationsSubPage = styled.div`
  margin-top: 40px;
`;
