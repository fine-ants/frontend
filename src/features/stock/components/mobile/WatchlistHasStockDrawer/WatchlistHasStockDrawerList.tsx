import useWatchlistHasStockQuery from "@features/watchlist/api/queries/useWatchlistHasStockQuery";
import styled from "styled-components";
import WatchlistHasStockDrawerItem from "./WatchlistHasStockDrawerItem";

type Props = {
  tickerSymbol: string;
};

export default function WatchlistHasStockDrawerList({ tickerSymbol }: Props) {
  const { data: hasStockData } = useWatchlistHasStockQuery(tickerSymbol);

  return (
    <StyledWatchlistHasStockDrawerList>
      {hasStockData.map((watchlist) => (
        <WatchlistHasStockDrawerItem
          key={watchlist.id}
          tickerSymbol={tickerSymbol}
          watchlist={watchlist}
        />
      ))}
    </StyledWatchlistHasStockDrawerList>
  );
}

const StyledWatchlistHasStockDrawerList = styled.ul`
  width: 100%;
  max-height: 616px;
  overflow-y: scroll;
  overflow-x: hidden;
`;
