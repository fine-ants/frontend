import useStockTargetPriceDeleteMutation from "@api/notifications/queries/useStockTargetPriceDeleteMutation";
import { StockTargetPrice } from "@api/notifications/types";
import ConfirmAlert from "@components/ConfirmAlert";
import { IconButton } from "@components/common/Buttons/IconButton";
import { TableCell, TableRow } from "@mui/material";
import { thousandsDelimiter } from "@utils/delimiters";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  row: StockTargetPrice & { companyName: string };
};

export default function StockNotificationLotRow({ row }: Props) {
  const { companyName, targetPrice, notificationId } = row;

  const { mutate: stockNotificationDeleteMutate } =
    useStockTargetPriceDeleteMutation();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onRemoveNotificationButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onRemoveNotificationAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmRemove = () => {
    stockNotificationDeleteMutate({
      targetNotificationId: notificationId,
    });
  };

  return (
    <StyledStockNotificationRow>
      <StyledTableCell align="left">
        ₩{thousandsDelimiter(targetPrice)}
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
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title={`[${companyName} ${targetPrice}KRW] 지정가 알림을 삭제하시겠습니까?`}
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
