import ConfirmAlert from "@components/ConfirmAlert";

type Props<Item> = {
  isOpen: boolean;
  selected: readonly Item[];
  onClose: () => void;
  onConfirm: () => void;
};

export default function PortfolioListDeleteConfirm<
  Item extends { name: string },
>({ isOpen, selected, onClose, onConfirm }: Props<Item>) {
  return (
    <ConfirmAlert
      isOpen={isOpen}
      title="포트폴리오 삭제"
      onClose={onClose}
      onConfirm={onConfirm}>
      <span>
        '
        {`${selected.length !== 0 && selected[0].name}'${
          selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
        } 포트폴리오를 삭제하시겠습니까?`}
      </span>
    </ConfirmAlert>
  );
}
