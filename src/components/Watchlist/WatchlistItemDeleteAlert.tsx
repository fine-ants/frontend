import useWatchlistItemDeleteMutation from "@api/watchlist/queries/useWatchlistItemDeleteMutation";
import BaseModal from "@components/BaseModal";

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
    onCloseModal: onClose,
  });

  const deleteItemFromWatchlist = () => {
    watchlistItemDeleteMutate();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>진짜로 삭제하시겠습니까?</div>
      <div onClick={deleteItemFromWatchlist}>예</div>
      <div onClick={onClose}>아니오</div>
    </BaseModal>
  );
}
