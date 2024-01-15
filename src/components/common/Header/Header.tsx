import usePortfolioListHeaderQuery from "@api/portfolio/queries/usePortfolioListHeaderQuery";
import { PortfolioItem } from "@api/portfolio/types";
import BIImage from "@assets/icons/logo/ic_fineants-header.svg";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import { UserContext } from "@context/UserContext";
import { Button } from "@mui/material";
import Routes from "@router/Routes";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "../../NavBar";
import SearchBar from "../../SearchBar/SearchBar";
import TVTickerTapeWidget from "../../TradingViewWidgets/TVTickerTape";
import { PortfoliosDropdown } from "./PortfoliosDropdown";
import UserControls from "./UserControls";

export default function Header() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  // TODO: Move into PortfoliosDropdown
  const { data: portfolioList } = usePortfolioListHeaderQuery();

  const [isPortfolioAddDialogOpen, setIsPortfolioAddDialogOpen] =
    useState(false);

  const navItems = [
    {
      name: "Watchlists",
      to: Routes.WATCHLISTS,
    },
    { name: "Indices", to: Routes.INDICES },
  ];

  const portfolioDropdownItems = portfolioList?.portfolios?.map(
    (portfolio: PortfolioItem) => ({
      name: portfolio.name,
      onClick: () => {
        navigate(`/portfolio/${portfolio.id}`);
      },
    })
  );

  const onLogoClick = () => {
    navigate(user ? Routes.DASHBOARD : Routes.LANDING);
  };

  const onPortfolioAddClick = () => {
    setIsPortfolioAddDialogOpen(true);
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
              <PortfoliosDropdown
                portfolioDropdownItems={portfolioDropdownItems}
                onPortfolioAddClick={onPortfolioAddClick}
              />
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
            <>
              <Button onClick={moveToSignInPage}>로그인</Button>
              <Button onClick={moveToSignUpPage}>회원가입</Button>
            </>
          )}
        </HeaderRight>
      </HeaderTop>

      <TVTickerTapeWidget />

      {isPortfolioAddDialogOpen && (
        <PortfolioAddDialog
          isOpen={isPortfolioAddDialogOpen}
          onClose={() => setIsPortfolioAddDialogOpen(false)}
        />
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  z-index: 10;
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
  gap: 38px;
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
