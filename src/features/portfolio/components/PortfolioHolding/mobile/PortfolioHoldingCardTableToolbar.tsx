import SelectableCardTableToolbar from "@components/CardTable/SelectableCardTable/SelectableCardTableToolbar";
import usePortfolioHoldingDeleteMutation from "@features/portfolio/api/queries/usePortfolioHoldingDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import PortfolioHoldingSelectedDeleteConfirm from "../PortfolioHoldingSelectedDeleteConfirm";

type Props<Item> = {
  selected: readonly Item[];
  isAllRowsSelectedInCurrentPage: boolean;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSelected: () => void;
  openDrawer: () => void;
};

export default function PortfolioHoldingCardTableToolbar<
  Item extends { id: number; companyName: string },
>({
  selected,
  isAllRowsSelectedInCurrentPage,
  onSelectAllClick,
  clearSelected,
  openDrawer,
}: Props<Item>) {
  const { portfolioId } = useParams();

  const {
    state: isDeleteConfirmOpen,
    setTrue: openDeleteConfirm,
    setFalse: closeDeleteConfirm,
  } = useBoolean();

  const { mutateAsync: portfolioHoldingDeleteMutateAsync } =
    usePortfolioHoldingDeleteMutation(Number(portfolioId));

  const onConfirmAction = async () => {
    const selectedHoldingIds = selected.map((item) => item.id);

    await portfolioHoldingDeleteMutateAsync({
      portfolioId: Number(portfolioId),
      body: { portfolioHoldingIds: selectedHoldingIds },
    });

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

      <PortfolioHoldingSelectedDeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={onConfirmAction}
        selected={selected}
      />
    </>
  );
}
