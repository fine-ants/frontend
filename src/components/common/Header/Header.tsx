import BIImage from "@assets/icons/logo/ic_fineants-header.svg";
import { UserContext } from "@context/UserContext";
import Routes from "@router/Routes";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "../../NavBar";
import SearchBar from "../../SearchBar/SearchBar";
import TVTickerTapeWidget from "../../TradingViewWidgets/TVTickerTape";
import Button from "../Buttons/Button";
import { PortfoliosDropdown } from "./PortfoliosDropdown/PortfoliosDropdown";
import UserControls from "./UserControls";

export default function Header() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const navItems = [
    {
      name: "Watchlists",
      to: user ? Routes.WATCHLISTS : Routes.SIGNIN,
    },
    { name: "Indices", to: "/indices/KRX:KOSPI" },
  ];

  const onLogoClick = () => {
    navigate(user ? Routes.DASHBOARD : Routes.LANDING);
  };

  const moveToSignInPage = () => {
    navigate(Routes.SIGNIN);
  };

  const moveToSignUpPage = () => {
    navigate(Routes.SIGNUP);
  };

  return (
    <StyledHeader>
      <HeaderTop>
        <HeaderLeft>
          <StyledBrandIdentity onClick={onLogoClick}>
            <img src={BIImage} alt="FineAnts" />
          </StyledBrandIdentity>
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
            <UserControls />
          ) : (
            <ButtonWrapper>
              <Button variant="text" size="h32" onClick={moveToSignInPage}>
                로그인
              </Button>
              <Button variant="primary" size="h32" onClick={moveToSignUpPage}>
                회원가입
              </Button>
            </ButtonWrapper>
          )}
        </HeaderRight>
      </HeaderTop>

      <TVTickerTapeWidget />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  color: ${({ theme: { color } }) => color.neutral.white};
  background-color: ${({ theme: { color } }) => color.neutral.gray900};
`;

const HeaderTop = styled.header`
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

const StyledBrandIdentity = styled.div`
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
