import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import { PortfolioItem } from "@api/portfolio/types";
import BIImage from "@assets/images/profileImage.png";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import { UserContext } from "@context/UserContext";
import { Button } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "../NavBar";
import SearchBar from "../SearchBar/SearchBar";
import TVTickerTapeWidget from "../TradingViewWidgets/TVTickerTape";
import UserControls from "../common/UserControls";
import { PortfoliosDropdown } from "./PortfoliosDropdown";

export default function Header() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { data: portfolioList } = usePortfolioListQuery();

  const [isPortfolioAddDialogOpen, setIsPortfolioAddDialogOpen] =
    useState(false);

  const navItems = [
    {
      name: "Watchlists",
      path: Routes.WATCHLISTS,
    },
    { name: "Indices", path: Routes.INDICES },
  ];

  const portfolioDropdownItems = portfolioList?.portfolios?.map(
    (portfolio: PortfolioItem) => {
      return {
        name: portfolio.name,
        onClick: () => {
          navigate(`/portfolio/${portfolio.id}`);
        },
      };
    }
  );

  const onPortfolioAddClick = () => {
    setIsPortfolioAddDialogOpen(true);
  };

  const moveToStockPage = (tickerSymbol: string) => {
    navigate(`/stock/${tickerSymbol}`);
  };

  const moveToSignInPage = () => {
    navigate(Routes.SIGNIN);
  };

  const moveToSignUpPage = () => {
    navigate(Routes.SIGNUP);
  };

  return (
    <>
      <StyledHeader>
        <HeaderTop>
          <HeaderLeft>
            <StyledBrandIdentity onClick={() => navigate("/dashboard")}>
              <img src={BIImage} alt="FineAnts" />
              FineAnts
            </StyledBrandIdentity>
            <NavBar style={navBarStyles}>
              <PortfoliosDropdown
                portfolioDropdownItems={portfolioDropdownItems}
                onPortfolioAddClick={onPortfolioAddClick}
              />
              {navItems.map((item) => (
                <NavBar.NavItem
                  key={item.name}
                  item={item}
                  style={navItemStyle}
                />
              ))}
            </NavBar>
          </HeaderLeft>
          <HeaderRight>
            <SearchBar>
              <SearchBar.Input />
              <SearchBar.SearchList onItemClick={moveToStockPage} />
            </SearchBar>
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
    </>
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

const navBarStyles = {
  backgroundColor: designSystem.color.neutral.gray900,
  display: "flex",
  gap: "40px",
  alignItems: "center",
  font: designSystem.font.title4,
  letterSpacing: "-0.02em",
};

const navItemStyle = {
  width: "80px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  font: designSystem.font.title4,
  letterSpacing: "-0.02em",
  cursor: "pointer",
};
