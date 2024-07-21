import ConfirmAlert from "@components/ConfirmAlert";

type Props<Item> = {
  isOpen: boolean;
  selected: readonly Item[];
  onClose: () => void;
  onConfirm: () => void;
};

export default function PortfolioHoldingSelectedDeleteConfirm<
  Item extends { companyName: string },
>({ isOpen, selected, onClose, onConfirm }: Props<Item>) {
  return (
    <ConfirmAlert
      isOpen={isOpen}
      title="선택 종목 삭제"
      onClose={onClose}
      onConfirm={onConfirm}>
      <span>
        {`'${selected.length !== 0 && selected[0].companyName}'${
          selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
        } 종목을 삭제하시겠습니까?`}
      </span>
    </ConfirmAlert>
  );
}
