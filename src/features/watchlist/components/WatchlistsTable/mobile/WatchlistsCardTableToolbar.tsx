import SelectableCardTableToolbar from "@components/CardTable/SelectableCardTable/SelectableCardTableToolbar";
import useWatchlistsDeleteMutation from "@features/watchlist/api/queries/useWatchlistsDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import { ChangeEvent } from "react";
import WatchlistsDeleteConfirm from "../WatchlistsDeleteConfirm";

type Props<Item> = {
  selected: readonly Item[];
  isAllRowsSelectedInCurrentPage: boolean;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSelected: () => void;
  openDrawer: () => void;
};

export default function WatchlistsCardTableToolbar<
  Item extends { id: number; name: string },
>({
  selected,
  isAllRowsSelectedInCurrentPage,
  onSelectAllClick,
  clearSelected,
  openDrawer,
}: Props<Item>) {
  const { mutateAsync: watchlistsDeleteMutateAsync } =
    useWatchlistsDeleteMutation();

  const {
    state: isDeleteConfirmOpen,
    setTrue: openDeleteConfirm,
    setFalse: closeDeleteConfirm,
  } = useBoolean();

  const onConfirmAction = async () => {
    const selectedWatchlistIds = selected.map((item) => item.id);
    await watchlistsDeleteMutateAsync(selectedWatchlistIds);

    clearSelected();
  };

  return (
    <>
      <SelectableCardTableToolbar
        numSelected={selected.length}
        isAllRowsSelectedInCurrentPage={isAllRowsSelectedInCurrentPage}
        onSelectAllClick={onSelectAllClick}
        openDrawer={openDrawer}
        openDeleteConfirm={openDeleteConfirm}
      />

      <WatchlistsDeleteConfirm
        selected={selected}
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={onConfirmAction}
      />
    </>
  );
}
