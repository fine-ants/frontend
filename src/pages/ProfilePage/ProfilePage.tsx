import { OAuthProvider } from "@api/auth";
import SubPageNav from "@components/common/SubPageNav/SubPageNav";
import { UserContext } from "@context/UserContext";
import BasePage from "@pages/BasePage";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AccountSettingsSubPage from "./subPages/AccountSettingsSubPage";
import ProfileSettingsSubPage from "./subPages/ProfileSettingsSubPage";

function isValidTab(
  tab: string | undefined,
  provider: OAuthProvider | "local"
) {
  return tab === "profile" || (tab === "account" && provider === "local");
}

export default function ProfilePage() {
  const { tab } = useParams();

  const { user } = useContext(UserContext);

  if (!isValidTab(tab, user!.provider)) {
    return <Navigate to={`/${Routes.FALLBACK}`} />;
  }

  const subPageNavItems =
    user!.provider !== "local"
      ? [{ title: "프로필 설정", to: "/settings/profile" }]
      : [
          { title: "프로필 설정", to: "/settings/profile" },
          { title: "계정 설정", to: "/settings/account" },
        ];

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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;
