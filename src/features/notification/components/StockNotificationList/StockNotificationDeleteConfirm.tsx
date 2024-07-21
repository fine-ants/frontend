import ConfirmAlert from "@components/ConfirmAlert";
import { thousandsDelimiter } from "@fineants/demolition";

type Props = {
  isOpen: boolean;
  companyName: string;
  targetPrice: number;
  onClose: () => void;
  onConfirm: () => void;
};

export default function StockNotificationDeleteConfirm({
  isOpen,
  companyName,
  targetPrice,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmAlert
      isOpen={isOpen}
      title={"지정가 알림 삭제"}
      onClose={onClose}
      onConfirm={onConfirm}>
      [{companyName} ${thousandsDelimiter(targetPrice)}KRW] 지정가 알림을
      삭제하시겠습니까?
    </ConfirmAlert>
  );
}
