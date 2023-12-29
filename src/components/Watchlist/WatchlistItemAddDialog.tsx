import useWatchlistItemAddMutation from "@api/watchlist/queries/useWatchlistItemAddMutation";
import BaseDialog from "@components/BaseDialog";
import SearchBar, { StockInfo } from "@components/SearchBar/SearchBar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistItemAddDialog({ isOpen, onClose }: Props) {
  const { mutate: watchlistItemAddMutate } = useWatchlistItemAddMutation({
    onCloseDialog: onClose,
  });

  const addItemToWatchlist = (stockInfo: StockInfo) => {
    watchlistItemAddMutate(stockInfo.tickerSymbol);
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <SearchBar onItemClick={addItemToWatchlist} />
    </BaseDialog>
  );
}
