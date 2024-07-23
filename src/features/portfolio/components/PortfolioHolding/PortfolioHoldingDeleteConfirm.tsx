import ConfirmAlert from "@components/ConfirmAlert";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function PortfolioHoldingDeleteConfirm({
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmAlert
      isOpen={isOpen}
      title="종목 삭제"
      onClose={onClose}
      onConfirm={onConfirm}>
      매입 이력을 삭제하시겠습니까?
    </ConfirmAlert>
  );
}
