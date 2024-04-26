import BIImage from "@assets/icons/logo/ic_fineants-header.svg";
import { PortfoliosDropdown } from "@features/portfolio/components/PortfoliosDropdown/PortfoliosDropdown";
import UserControls from "@features/user/components/UserDropdown/UserControls";
import { UserContext } from "@features/user/context/UserContext";
import Routes from "@router/Routes";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Buttons/Button";
import { TextButton } from "../../Buttons/TextButton";
import SearchBar from "../../SearchBar/SearchBar";
import { NavBar } from "../NavBar";

export default function HeaderTopD() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const navItems = [
    {
      name: "Watchlists",
      to: user ? Routes.WATCHLISTS : Routes.SIGNIN,
    },
    { name: "Indices", to: "/indices/KRX:KOSPI" },
  ];

  const moveToSignInPage = () => {
    navigate(Routes.SIGNIN);
  };

  const moveToSignUpPage = () => {
    navigate(Routes.SIGNUP);
  };

  return (
    <StyledHeaderTopD>
      <HeaderLeft>
        <StyledBrandIdentityLink to={user ? Routes.DASHBOARD : Routes.LANDING}>
          <img src={BIImage} alt="FineAnts" />
        </StyledBrandIdentityLink>
        <NavBar>
          <NavBar.NavItem>
            <PortfoliosDropdown />
          </NavBar.NavItem>
          {navItems.map((item) => (
            <NavBar.NavItem key={item.name} item={item} />
          ))}
        </NavBar>
      </HeaderLeft>
      <HeaderRight>
        <SearchBar sx={{ width: "328px" }} />

        {user ? (
          <UserControls user={user} />
        ) : (
          <ButtonWrapper>
            <TextButton size="h32" color="white" onClick={moveToSignInPage}>
              로그인
            </TextButton>
            <Button variant="primary" size="h32" onClick={moveToSignUpPage}>
              회원가입
            </Button>
          </ButtonWrapper>
        )}
      </HeaderRight>
    </StyledHeaderTopD>
  );
}

const StyledHeaderTopD = styled.header`
  height: 80px;
  display: flex;
  gap: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  margin-left: auto;
`;

const StyledBrandIdentityLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 160px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
