import SelectableCardTableToolbar from "@components/CardTable/SelectableCardTable/SelectableCardTableToolbar";
import usePortfoliosDeleteMutation from "@features/portfolio/api/queries/usePortfoliosDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import { ChangeEvent } from "react";
import PortfolioListDeleteConfirm from "../PortfolioListDeleteConfirm";

type Props<Item> = {
  selected: readonly Item[];
  isAllRowsSelectedInCurrentPage: boolean;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSelected: () => void;
  openDrawer: () => void;
};

export default function PortfolioListCardTableToolbar<
  Item extends { id: number; name: string },
>({
  selected,
  isAllRowsSelectedInCurrentPage,
  onSelectAllClick,
  clearSelected,
  openDrawer,
}: Props<Item>) {
  const {
    state: isDeleteConfirmOpen,
    setTrue: openDeleteConfirm,
    setFalse: closeDeleteConfirm,
  } = useBoolean();

  const { mutateAsync: portfoliosDeleteMutateAsync } =
    usePortfoliosDeleteMutation();

  const onConfirmAction = async () => {
    const selectedPortfolioIds = selected.map((item) => item.id);

    await portfoliosDeleteMutateAsync(selectedPortfolioIds);
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

      <PortfolioListDeleteConfirm
        selected={selected}
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={onConfirmAction}
      />
    </>
  );
}
