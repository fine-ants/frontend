import useWatchlistHasStockQuery from "@api/watchlist/queries/useWatchlistHasStockQuery";
import styled from "styled-components";
import WatchlistHasStockDropdownItem from "./WatchlistHasStockDropdownItem";

type Props = {
  tickerSymbol: string;
};

export default function WatchlistHasStockList({ tickerSymbol }: Props) {
  const { data: hasStockData } = useWatchlistHasStockQuery(tickerSymbol);

  return (
    <StyledWatchlistHasStockList>
      {hasStockData.map((watchlist) => (
        <WatchlistHasStockDropdownItem
          key={watchlist.id}
          tickerSymbol={tickerSymbol}
          watchlist={watchlist}
        />
      ))}
    </StyledWatchlistHasStockList>
  );
}

const StyledWatchlistHasStockList = styled.ul`
  width: 100%;
  max-height: 160px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;
