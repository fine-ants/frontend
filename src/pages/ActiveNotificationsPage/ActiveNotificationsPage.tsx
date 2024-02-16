import SubPageNav from "@components/common/SubPageNav/SubPageNav";
import BasePage from "@pages/BasePage";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioNotificationsSubPage from "./subPages/PortfolioNotificationsSubPage";
import StockNotificationsSubPage from "./subPages/StockNotificationsSubPage";

function isValidTab(tab: string | undefined) {
  return tab === "stock" || tab === "portfolio";
}

const subPageNavItems = [
  { title: "종목 알림", to: "/notifications/stock" },
  { title: "포트폴리오 알림", to: "/notifications/portfolio" },
];

export default function ActiveNotificationsPage() {
  const { tab } = useParams();

  if (!isValidTab(tab)) {
    return <Navigate to={`/${Routes.FALLBACK}`} />;
  }

  return (
    <BasePage>
      <Container>
        <Title>활성 알림</Title>

        <SubPageNav navItems={subPageNavItems} />

        {tab === "stock" && <StockNotificationsSubPage />}
        {tab === "portfolio" && <PortfolioNotificationsSubPage />}
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Title = styled.div`
  margin-bottom: 24px;
  font: ${designSystem.font.heading2.font};
  letter-spacing: ${designSystem.font.heading2.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;
