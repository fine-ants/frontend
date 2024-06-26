import { IconButton } from "@components/Buttons/IconButton";
import useSpecificStockTargetPricesQuery from "@features/notification/api/queries/useSpecificStockTargetPricesQuery";
import useStockTargetPriceDeleteMutation from "@features/notification/api/queries/useStockTargetPriceDeleteMutation";
import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function TargetPricesList() {
  const { tickerSymbol } = useParams();

  const { data: targetPrices } = useSpecificStockTargetPricesQuery(
    tickerSymbol as string
  );
  const { mutate: deleteTargetPriceMutate } = useStockTargetPriceDeleteMutation(
    tickerSymbol as string
  );

  const sortedTargetPrices = targetPrices.sort(
    (a, b) => b.targetPrice - a.targetPrice
  );

  const onRemoveButtonClick = (targetNotificationId: number) => {
    deleteTargetPriceMutate({ targetNotificationId });
  };

  return (
    <StyledTargetPricesList>
      {sortedTargetPrices.map((item) => (
        <TargetPriceItem key={item.notificationId}>
          <span>{thousandsDelimiter(item.targetPrice)}</span>
          <IconButton
            icon="remove"
            iconColor="gray"
            size="h24"
            onClick={() => onRemoveButtonClick(item.notificationId)}
          />
        </TargetPriceItem>
      ))}
    </StyledTargetPricesList>
  );
}

const StyledTargetPricesList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TargetPriceItem = styled.li`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
