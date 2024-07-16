import ConfirmAlert from "@components/ConfirmAlert";

type Props = {
  isOpen: boolean;
  companyName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function StockNotificationDeleteAllConfirm({
  isOpen,
  companyName,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmAlert
      isOpen={isOpen}
      title={"지정가 알림 전체 삭제"}
      onClose={onClose}
      onConfirm={onConfirm}>
      [{companyName}] 지정가 알림을 모두 삭제하시겠습니까?
    </ConfirmAlert>
  );
}
