import BasePage from "@pages/BasePage";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { NavLink, Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileSettingsSubPage from "./subPages/ProfileSettingsSubPage";

function isValidTab(tab: string | undefined) {
  return tab === "profile" || tab === "account";
}

export default function SettingsPage() {
  const { tab } = useParams();

  if (!isValidTab(tab)) {
    return <Navigate to={`/${Routes.FALLBACK}`} />;
  }

  return (
    <BasePage>
      <Container>
        <Title>설정</Title>

        <Nav>
          <ul>
            <li>
              <NavLink to="/settings/profile">프로필 설정</NavLink>
            </li>
            <li>
              <NavLink to="/settings/account">계정 설정</NavLink>
            </li>
          </ul>
        </Nav>

        {tab === "profile" && <ProfileSettingsSubPage />}
        {/* {tab === "account" && <AccountSettingsSubPage />} */}
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
  font: ${designSystem.font.heading2};
`;

const Nav = styled.nav`
  width: 100%;
  height: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};

  > ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    > li {
      width: 120px;
      height: 100%;
      margin-bottom: -2px;
      font: ${designSystem.font.title4};
      color: ${designSystem.color.neutral.gray600};

      > a {
        width: 100%;
        height: 100%;
        display: block;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
      }

      > a.active {
        border-bottom: 2px solid ${designSystem.color.primary.blue500};
        color: ${designSystem.color.primary.blue500};
      }
    }
  }
`;
