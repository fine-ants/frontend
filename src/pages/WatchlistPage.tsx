import Watchlist from "@components/Watchlist/Watchlist";
import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function WatchlistPage() {
  return (
    <StyledWatchlistPage>
      <Header />
      <Main>
        <Watchlist />
      </Main>
      <Footer />
    </StyledWatchlistPage>
  );
}

const StyledWatchlistPage = styled(BasePage)``;

const Main = styled.main`
  width: 100%;
  height: 828px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
