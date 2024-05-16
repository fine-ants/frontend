import SubPageTabs from "@components/SubPageTabs";
import {
  MAIN_FOOTER_HEIGHT,
  MAIN_HEADER_TOTAL_HEIGHT_D,
  MAIN_HEADER_TOTAL_HEIGHT_M,
} from "@constants/styleConstants";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import BasePage from "@pages/BasePage";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AccountSettingsSubPage from "./subPages/AccountSettingsSubPage";
import ProfileSettingsSubPage from "./subPages/ProfileSettingsSubPage";

function isValidTab(tab: string | undefined) {
  return tab === "profile" || tab === "account";
}

const subPageTabItems = [
  { title: "프로필 설정", to: "/settings/profile" },
  { title: "계정 설정", to: "/settings/account" },
];

export default function ProfilePage() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { tab } = useParams();

  if (!isValidTab(tab)) {
    return <Navigate to={`/${Routes.FALLBACK}`} />;
  }

  return (
    <BasePage>
      <Container $isDesktop={isDesktop} $isMobile={isMobile}>
        <Title $isMobile={isMobile}>설정</Title>

        <SubPageTabs tabItems={subPageTabItems} />

        <SubPageWrapper>
          {tab === "profile" && <ProfileSettingsSubPage />}
          {tab === "account" && <AccountSettingsSubPage />}
        </SubPageWrapper>
      </Container>
    </BasePage>
  );
}

const Container = styled.div<{ $isDesktop: boolean; $isMobile: boolean }>`
  width: 100%;
  max-width: 544px;
  height: calc(
    100vh -
      ${({ $isMobile }) =>
        $isMobile
          ? `${MAIN_HEADER_TOTAL_HEIGHT_M}px`
          : `${MAIN_HEADER_TOTAL_HEIGHT_D}px`} - ${MAIN_FOOTER_HEIGHT}px
  );
  margin-top: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "32px")};
  display: flex;
  flex-direction: column;
  background-color: ${designSystem.color.neutral.white};
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

const SubPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
