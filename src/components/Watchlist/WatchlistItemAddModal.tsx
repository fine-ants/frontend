import useWatchlistItemAddMutation from "@api/watchlist/queries/useWatchlistItemAddMutation";
import BaseModal from "@components/BaseModal";
import SearchBar from "@components/SearchBar/SearchBar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistItemAddModal({ isOpen, onClose }: Props) {
  const { mutate: watchlistItemAddMutate } = useWatchlistItemAddMutation({
    onCloseModal: onClose,
  });

  const addItemToWatchlist = (tickerSymbol: string) => {
    watchlistItemAddMutate(tickerSymbol);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <>
        <SearchBar>
          <SearchBar.Input />
          <SearchBar.SearchList onItemClick={addItemToWatchlist} />
        </SearchBar>
      </>
    </BaseModal>
  );
}
