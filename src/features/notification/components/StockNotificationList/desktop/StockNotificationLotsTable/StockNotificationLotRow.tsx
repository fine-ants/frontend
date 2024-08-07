import { IconButton } from "@components/Buttons/IconButton";
import useStockTargetPriceDeleteMutation from "@features/notification/api/queries/useStockTargetPriceDeleteMutation";
import { StockTargetPrice } from "@features/notification/api/types";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import { TableCell, TableRow } from "@mui/material";
import styled from "styled-components";
import StockNotificationDeleteConfirm from "../../StockNotificationDeleteConfirm";

type Props = {
  row: StockTargetPrice & { companyName: string };
};

export default function StockNotificationLotRow({ row }: Props) {
  const { companyName, targetPrice, notificationId } = row;

  const { mutate: stockNotificationDeleteMutate } =
    useStockTargetPriceDeleteMutation();
  const {
    state: isConfirmOpen,
    setTrue: onRemoveNotificationButtonClick,
    setFalse: onRemoveNotificationAlertClose,
  } = useBoolean();

  const onConfirmRemove = () => {
    stockNotificationDeleteMutate({
      targetNotificationId: notificationId,
    });
  };

  return (
    <StyledStockNotificationRow>
      <StyledTableCell align="left">
        {thousandsDelimiter(targetPrice)}
      </StyledTableCell>

      <StyledTableCell style={{ width: "120px" }} align="center">
        <IconButton
          icon="trash"
          size="h24"
          iconColor="gray"
          onClick={onRemoveNotificationButtonClick}
        />
      </StyledTableCell>

      {isConfirmOpen && (
        <StockNotificationDeleteConfirm
          companyName={companyName}
          targetPrice={targetPrice}
          isOpen={isConfirmOpen}
          onClose={onRemoveNotificationAlertClose}
          onConfirm={onConfirmRemove}
        />
      )}
    </StyledStockNotificationRow>
  );
}

const StyledStockNotificationRow = styled(TableRow)`
  &:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray100};
  }

  & > td,
  & > th {
    border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  }

  &:last-of-type {
    & > td,
    & > th {
      border-bottom: none;
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 32px;
  padding: 0 8px;

  &:first-of-type {
    padding-left: 16px;
  }

  &:last-of-type {
    padding-right: 16px;
  }

  > button {
    padding: 0;
  }
`;
