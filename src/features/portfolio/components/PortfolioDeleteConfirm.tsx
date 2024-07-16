import ConfirmAlert from "@components/ConfirmAlert";

type Props = {
  isOpen: boolean;
  portfolioName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function PortfolioDeleteConfirm({
  isOpen,
  portfolioName,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmAlert
      isOpen={isOpen}
      title="포트폴리오 삭제"
      onClose={onClose}
      onConfirm={onConfirm}>
      '{portfolioName}' 포트폴리오를 삭제하시겠습니까?
    </ConfirmAlert>
  );
}
