import Watchlist from "@components/Watchlist/Watchlist";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function WatchlistPage() {
  return (
    <StyledWatchlistPage>
      <h2>Watchlist</h2>

      <Watchlist />
    </StyledWatchlistPage>
  );
}

const StyledWatchlistPage = styled(BasePage)``;
