import { PortfolioItem } from "@api/portfolio";
import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
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
import Dropdown from "./Dropdown";

export default function Header() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { data: portfolioList } = usePortfolioListQuery();

  const [isPortfolioAddDialogOpen, setIsPortfolioAddDialogOpen] =
    useState(false);

  const navItems = [
    {
      name: "Watchlist",
      path: Routes.WATCHLIST,
    },
    { name: "Indices", path: Routes.INDICES },
  ];

  const dropdownItems = portfolioList?.portfolios?.map(
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
        {isPortfolioAddDialogOpen && (
          <PortfolioAddDialog
            isOpen={isPortfolioAddDialogOpen}
            onClose={() => setIsPortfolioAddDialogOpen(false)}
          />
        )}
        <HeaderTop>
          <HeaderLeft>
            <StyledBrandIdentity onClick={() => navigate("/dashboard")}>
              <img src={BIImage} alt="FineAnts" />
              FineAnts
            </StyledBrandIdentity>
            <NavBar style={navBarStyles}>
              <Dropdown>
                <Dropdown.Toggle>Portfolio</Dropdown.Toggle>
                <Dropdown.Menu>
                  {dropdownItems?.map((item) => (
                    <Dropdown.Item key={item.name} item={item} />
                  ))}
                  <Dropdown.Item
                    item={{
                      name: "포트폴리오로 이동",
                      onClick: () => navigate("/profile/portfolio"),
                    }}
                  />
                  <Dropdown.Item
                    item={{
                      name: "포트폴리오 추가",
                      onClick: onPortfolioAddClick,
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>
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
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  z-index: 10;
  color: ${({ theme: { color } }) => color.neutral.white};
  background-color: ${({ theme: { color } }) => color.neutral.gray900}};
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
