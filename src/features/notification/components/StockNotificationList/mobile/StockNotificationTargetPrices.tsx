import { IconButton } from "@components/Buttons/IconButton";
import ConfirmAlert from "@components/ConfirmAlert";
import useStockTargetPriceDeleteMutation from "@features/notification/api/queries/useStockTargetPriceDeleteMutation";
import { StockTargetPrice } from "@features/notification/api/types";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  companyName: string;
  targetPrices: StockTargetPrice[];
};

export function StockNotificationTargetPrices({
  companyName,
  targetPrices,
}: Props) {
  const { mutate: stockNotificationRemoveMutate } =
    useStockTargetPriceDeleteMutation();

  const {
    state: isRemoveConfirmOpen,
    setTrue: onRemoveNotificationAlertOpen,
    setFalse: onRemoveNotificationAlertClose,
  } = useBoolean();

  const [removeTargetPrice, setRemoveTargetPrice] = useState<number>();
  const [removeTargetPriceId, setRemoveTargetPriceId] = useState<number>();

  const targetPriceConfirmOpen = (
    targetPrice: number,
    targetPriceId: number
  ) => {
    setRemoveTargetPrice(targetPrice);
    setRemoveTargetPriceId(targetPriceId);
    onRemoveNotificationAlertOpen();
  };

  const onConfirmRemove = () => {
    if (!removeTargetPriceId) return;

    stockNotificationRemoveMutate({
      targetNotificationId: removeTargetPriceId,
    });
  };
  return (
    <StyledStockNotificationTargetPrices>
      {targetPrices.map((prices) => (
        <TargetPriceRow key={prices.notificationId}>
          <Price>₩{thousandsDelimiter(prices.targetPrice)}</Price>
          <IconButton
            icon="trash"
            size="h32"
            iconColor="gray"
            onClick={() =>
              targetPriceConfirmOpen(prices.targetPrice, prices.notificationId)
            }
          />
        </TargetPriceRow>
      ))}

      {isRemoveConfirmOpen && removeTargetPrice && (
        <ConfirmAlert
          isOpen={isRemoveConfirmOpen}
          title={`[${companyName} ${thousandsDelimiter(
            removeTargetPrice
          )}KRW] 지정가 알림을 삭제하시겠습니까?`}
          onClose={onRemoveNotificationAlertClose}
          onConfirm={onConfirmRemove}
        />
      )}
    </StyledStockNotificationTargetPrices>
  );
}

const StyledStockNotificationTargetPrices = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 16px;
  border-left: 1px solid ${designSystem.color.neutral.gray100};
  margin-top: 8px;
`;

const Price = styled.div`
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const TargetPriceRow = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
