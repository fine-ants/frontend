import SubPageNav from "@components/common/SubPageNav/SubPageNav";
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

const subPageNavItems = [
  { title: "프로필 설정", to: "/settings/profile" },
  { title: "계정 설정", to: "/settings/account" },
];

export default function ProfilePage() {
  const { tab } = useParams();

  if (!isValidTab(tab)) {
    return <Navigate to={`/${Routes.FALLBACK}`} />;
  }

  return (
    <BasePage>
      <Container>
        <Title>설정</Title>

        <SubPageNav navItems={subPageNavItems} />

        <SubPageWrapper>
          {tab === "profile" && <ProfileSettingsSubPage />}
          {tab === "account" && <AccountSettingsSubPage />}
        </SubPageWrapper>
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  width: 544px;
  height: 796px;
  margin-top: 49px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
`;

const Title = styled.div`
  margin-bottom: 24px;
  font: ${designSystem.font.heading2.font};
  letter-spacing: ${designSystem.font.heading2.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const SubPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
