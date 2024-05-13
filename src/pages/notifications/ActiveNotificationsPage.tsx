import SubPageTabs from "@components/SubPageTabs";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
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
  const { isMobile } = useResponsiveLayout();

  const { tab } = useParams();

  if (!isValidTab(tab)) {
    return <Navigate to={`/${Routes.FALLBACK}`} />;
  }

  return (
    <BasePage>
      <Container $isMobile={isMobile}>
        <Title $isMobile={isMobile}>활성 알림</Title>

        <SubPageTabs tabItems={subPageNavItems} />

        {tab === "stock" && <StockNotificationsSubPage />}
        {tab === "portfolio" && <PortfolioNotificationsSubPage />}
      </Container>
    </BasePage>
  );
}

const Container = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "32px")};
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Title = styled.div<{ $isMobile: boolean }>`
  margin: ${({ $isMobile }) =>
    $isMobile ? "32px 16px 16px 16px" : "0 0 24px 0"};
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading3.font
      : designSystem.font.heading2.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading3.letterSpacing
      : designSystem.font.heading2.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;
