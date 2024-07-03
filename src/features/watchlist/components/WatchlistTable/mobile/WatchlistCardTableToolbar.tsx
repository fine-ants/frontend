import SelectableCardTableToolbar from "@components/CardTable/SelectableCardTable/SelectableCardTableToolbar";
import { WatchlistItemType } from "@features/watchlist/api";
import useWatchlistItemDeleteMutation from "@features/watchlist/api/queries/useWatchlistItemDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import WatchlistDeleteConfirm from "../WatchlistDeleteConfirm";

type Props = {
  selected: readonly WatchlistItemType[];
  isAllRowsSelectedInCurrentPage: boolean;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSelected: () => void;
  openDrawer: () => void;
};

export default function WatchlistCardTableToolbar({
  selected,
  isAllRowsSelectedInCurrentPage,
  onSelectAllClick,
  clearSelected,
  openDrawer,
}: Props) {
  const { watchlistId } = useParams();

  const { mutateAsync: watchlistItemDeleteMutateAsync } =
    useWatchlistItemDeleteMutation(Number(watchlistId), clearSelected);

  const {
    state: isDeleteConfirmOpen,
    setTrue: onDeleteConfirmOpen,
    setFalse: onDeleteConfirmClose,
  } = useBoolean();

  const onConfirmAction = () => {
    const tickerSymbols = selected.map((item) => item.tickerSymbol);
    watchlistItemDeleteMutateAsync(tickerSymbols);
  };

  return (
    <>
      <SelectableCardTableToolbar
        numSelected={selected.length}
        isAllRowsSelectedInCurrentPage={isAllRowsSelectedInCurrentPage}
        onSelectAllClick={onSelectAllClick}
        openDrawer={openDrawer}
        openDeleteConfirm={onDeleteConfirmOpen}
      />

      <WatchlistDeleteConfirm
        selected={selected}
        isOpen={isDeleteConfirmOpen}
        onClose={onDeleteConfirmClose}
        onConfirm={onConfirmAction}
      />
    </>
  );
}
