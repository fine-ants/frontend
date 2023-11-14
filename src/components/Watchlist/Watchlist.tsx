import { WatchlistItemType } from "@api/watchlist";
import useWatchlistQuery from "@api/watchlist/queries/useWatchlistQuery";
import { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import styled from "styled-components";
import WatchlistItemStock from "./WatchlistItem";
import WatchlistItemAddModal from "./WatchlistItemAddModal";
import WatchlistItemDeleteAlert from "./WatchlistItemDeleteAlert";

export default function Watchlist() {
  const { data: watchlistData } = useWatchlistQuery();

  const [watchlist, setWatchlist] = useState<WatchlistItemType[]>(
    watchlistData ?? []
  );

  const watchlistTitles = ["종목명", "현재가", "변동률", "배당금", "업종"];

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [currentSelectedTickerSymbol, setCurrentSelectedTickerSymbol] =
    useState(0);

  const onPlusButtonClick = () => {
    setIsAddItemModalOpen(true);
  };

  const onCloseItemAddModal = () => {
    setIsAddItemModalOpen(false);
  };

  const onDeleteButtonClick = (tickerSymbol: number) => {
    setIsDeleteAlertOpen(true);
    setCurrentSelectedTickerSymbol(tickerSymbol);
  };

  const onCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
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
          setWatchlist(arrayMove(watchlist, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <WatchlistContainer {...props}>{children}</WatchlistContainer>
        )}
        renderItem={({ value, props }) => (
          <WatchlistItemStock
            key={value.tickerSymbol}
            value={value}
            props={props}
            onMouseDown={onDeleteButtonClick}
          />
        )}
      />
      <PlusButton onClick={onPlusButtonClick}>+</PlusButton>

      <WatchlistItemAddModal
        isOpen={isAddItemModalOpen}
        onClose={onCloseItemAddModal}
      />

      <WatchlistItemDeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={onCloseDeleteAlert}
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
  gap: 16px;
`;
