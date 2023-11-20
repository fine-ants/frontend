import useWatchlistItemDeleteMutation from "@api/watchlist/queries/useWatchlistItemDeleteMutation";
import BaseDialog from "@components/BaseDialog";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentSelectedTickerSymbol: number;
};

export default function WatchlistItemDeleteAlert({
  isOpen,
  onClose,
  currentSelectedTickerSymbol,
}: Props) {
  const { mutate: watchlistItemDeleteMutate } = useWatchlistItemDeleteMutation({
    tickerSymbol: String(currentSelectedTickerSymbol),
    onCloseDialog: onClose,
  });

  const deleteItemFromWatchlist = () => {
    watchlistItemDeleteMutate();
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <div>진짜로 삭제하시겠습니까?</div>
      <Button onClick={deleteItemFromWatchlist}>예</Button>
      <Button onClick={onClose}>아니오</Button>
    </BaseDialog>
  );
}

const Button = styled.button`
  width: 100px;
  hegiht: 50px;
  background-color: #ffffff;
  border: 1px solid black;
`;
