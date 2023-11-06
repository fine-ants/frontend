import { PortfolioItem } from "@api/portfolio";
import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import PortfolioModal from "@components/Portfolio/PortfolioModal";
import { UserContext } from "@context/UserContext";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
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

  const [isPortfolioAddModalOpen, setIsPortfolioAddModalOpen] = useState(false);

  const navItems = [
    {
      name: "Watchlist",
      path: Routes.WATCHLIST,
    },
    { name: "indices", path: Routes.INDICES },
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
    setIsPortfolioAddModalOpen(true);
  };
  // const dropdownItems = [
  //   {
  //     name: "내꿈은워렌버핏",
  //     onClick: () => {
  //       navigate("/portfolio/1");
  //     },
  //   },
  //   {
  //     name: "단타왕",
  //     onClick: () => {
  //       navigate("/portfolio/5");
  //     },
  //   },
  //   {
  //     name: "물린게아니고장기투자",
  //     onClick: () => {
  //       navigate("/portfolio/6");
  //     },
  //   },
  // ];

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
        {isPortfolioAddModalOpen && (
          <PortfolioModal
            isOpen={isPortfolioAddModalOpen}
            onClose={() => setIsPortfolioAddModalOpen(false)}
          />
        )}
        <HeaderTop>
          <HeaderLeft>
            <StyledBrandIdentity onClick={() => navigate("/dashboard")}>
              FINEANTS
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
  background-color: #ffffff;
`;

const HeaderTop = styled.header`
  height: 80px;
  display: flex;
  gap: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-left: auto;
`;

const StyledBrandIdentity = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const navBarStyles = {
  backgroundColor: "#ffffff",
  display: "flex",
  gap: "58px",
  alignItems: "center",
};

const navItemStyle = {
  width: "80px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
};
