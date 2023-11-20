import Watchlist from "@components/Watchlist/Watchlist";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function WatchlistPage() {
  return (
    <StyledWatchlistPage>
      <Watchlist />
    </StyledWatchlistPage>
  );
}

const StyledWatchlistPage = styled(BasePage)``;
