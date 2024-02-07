import { StockTargetPrice } from "@api/notifications/types";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/common/Icon";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  row: StockTargetPrice & { companyName: string };
};

export default function StockNotificationLotRow({ row }: Props) {
  const { companyName, targetPrice } = row;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onRemoveNotificationButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onRemoveNotificationAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmRemove = () => {
    // TODO: request to remove all notifications
    // const selectedPortfolioIds = selected.map((item) => item.id);
    // stockNotificationAllDeleteMutate(tickerSymbol);
  };

  return (
    <StyledStockNotificationRow>
      <StyledTableCell style={{ width: "948px" }} align="left">
        {targetPrice}
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        <p />
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        <IconButton onClick={onRemoveNotificationButtonClick}>
          <Icon icon="trash" size={16} color="gray600" />
        </IconButton>
      </StyledTableCell>

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title={`[${companyName} ${targetPrice}KRW] 지정가 알림을 제거 하시겠습니까?`}
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
  padding: 0 16px;

  > button {
    padding: 0;
  }
`;
