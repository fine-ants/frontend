import { WatchlistItemType } from "@api/watchlist";
import useWatchlistQuery from "@api/watchlist/queries/useWatchlistQuery";
import { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import styled from "styled-components";
import WatchlistItem from "./WatchlistItem";
import WatchlistItemAddDialog from "./WatchlistItemAddDialog";
import WatchlistItemDeleteAlert from "./WatchlistItemDeleteAlert";

export default function Watchlist() {
  const { data: watchlistData } = useWatchlistQuery();

  const watchlistTitles = ["종목명", "현재가", "변동률", "배당금", "업종"];

  const [watchlist, setWatchlist] = useState<WatchlistItemType[]>(
    watchlistData ?? []
  );
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [currentSelectedTickerSymbol, setCurrentSelectedTickerSymbol] =
    useState(0);

  const onPlusButtonClick = () => {
    setIsAddItemDialogOpen(true);
  };

  const onItemAddDialogClose = () => {
    setIsAddItemDialogOpen(false);
  };

  const onDeleteButtonDown = (tickerSymbol: number) => {
    setIsDeleteAlertOpen(true);
    setCurrentSelectedTickerSymbol(tickerSymbol);
  };

  const onDeleteAlertClose = () => {
    setIsDeleteAlertOpen(false);
  };

  const onWatchlistItemReposition = (oldIndex: number, newIndex: number) => {
    setWatchlist(arrayMove(watchlist, oldIndex, newIndex));
  };

  useEffect(() => {
    setWatchlist(watchlistData ?? []);
  }, [watchlistData]);

  return (
    <StyledWatchlist>
      <WatchlistHeader>
        {watchlistTitles.map((title, index) => (
          <WatchListTitle key={index}>{title}</WatchListTitle>
        ))}
      </WatchlistHeader>
      <List
        values={watchlist}
        onChange={({ oldIndex, newIndex }) =>
          onWatchlistItemReposition(oldIndex, newIndex)
        }
        renderList={({ children, props }) => (
          <WatchlistContainer {...props}>{children}</WatchlistContainer>
        )}
        renderItem={({ value, props }) => (
          <WatchlistItem
            key={value.tickerSymbol}
            value={value}
            props={props}
            onMouseDown={onDeleteButtonDown}
          />
        )}
      />
      <PlusButton onClick={onPlusButtonClick}>+</PlusButton>

      <WatchlistItemAddDialog
        isOpen={isAddItemDialogOpen}
        onClose={onItemAddDialogClose}
      />

      <WatchlistItemDeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        currentSelectedTickerSymbol={currentSelectedTickerSymbol}
      />
    </StyledWatchlist>
  );
}

const StyledWatchlist = styled.div`
  position: relative;
  top: 50px;
  width: 1142px;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WatchlistHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border: 2px solid black;
  padding: 0 80px;
  display: flex;
  gap: 158px;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

const WatchListTitle = styled.div`
  width: 150px;
  text-align: center;
`;

const PlusButton = styled.button`
  font-size: 50px;
  margin-left: auto;
  height: 40px;
  display: flex;
  align-items: center;
`;

const WatchlistContainer = styled.ul`
  display: flex;
  flex-direction: column;
  // gap: 16px;
`;
