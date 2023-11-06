import { StockItem } from "@pages/WatchlistPage";
import update from "immutability-helper";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { WatchlistItem } from "./WatchlistItem";

export const Watchlist = memo(function Watchlist({
  stockItems,
}: {
  stockItems: StockItem[];
}) {
  const watchlistTitles = ["종목명", "현재가", "변동률", "배당금", "업종"];
  const [stocks, setStocks] = useState<StockItem[]>(stockItems);

  const moveStock = useCallback((dragIndex: number, hoverIndex: number) => {
    setStocks((prevStocks: StockItem[]) =>
      update(prevStocks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevStocks[dragIndex] as StockItem],
        ],
      })
    );
  }, []);

  const renderStock = useCallback((stock: StockItem, index: number) => {
    return (
      <WatchlistItem
        key={stock.id}
        id={`${stock.id}`}
        item={stock}
        index={index}
        moveStock={moveStock}
      />
    );
    // TODO: 라이브러리 변경해야함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledWatchlist>
      <WatchlistHeader>
        {watchlistTitles.map((title, index) => (
          <WatchListTitle key={index}>{title}</WatchListTitle>
        ))}
      </WatchlistHeader>
      {stocks.map((stock, i) => renderStock(stock, i))}
      <PlusButton>+</PlusButton>
    </StyledWatchlist>
  );
});

const StyledWatchlist = styled.div`
  position: relative;
  top: 50px;
  width: 1142px;
  background-color: #ffffff;
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
