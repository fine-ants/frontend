import { WatchlistItemType } from "@api/watchlist";
import { IItemProps } from "react-movable";
import styled from "styled-components";

type Props = {
  value: WatchlistItemType;
  props: IItemProps;
  onMouseDown: (tickerSymbol: number) => void;
};

export default function WatchlistItem({ value, props, onMouseDown }: Props) {
  return (
    <StyledWatchlistItem {...props}>
      <Name>{value.companyName}</Name>
      <CurrentPrice>₩ {value.currentPrice}</CurrentPrice>
      <Change $isUp={value.dailyChangeRate > 0}>
        {value.dailyChangeRate}%
      </Change>
      <GreenText>{value.annualDividendYield}%</GreenText>
      <GreenText>{value.sector}</GreenText>
      <div
        style={{ zIndex: "10" }}
        onMouseDown={() => onMouseDown(value.tickerSymbol)}>
        X
      </div>
    </StyledWatchlistItem>
  );
}

const StyledWatchlistItem = styled.div`
  height: 50px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 8px;
`;

const Item = styled.div`
  width: 350px;
  text-align: center;
`;

const Name = styled(Item)`
  color: black;
  cursor: pointer;
`;

const CurrentPrice = styled(Item)`
  color: black;
`;

const GreenText = styled(Item)`
  color: #22ab94;
`;

const Change = styled(Item)<{ $isUp: boolean }>`
  color: ${({ $isUp }) => ($isUp ? "#22AB94" : "#F34351")};
`;
