import { Icon } from "@components/common/Icon";
import { IconButton, TableCell, TableRow } from "@mui/material";
import styled from "styled-components";
import { StockTargetPrice } from "../StockNotificationListTable";

type Props = {
  row: StockTargetPrice;
};

export default function StockNotificationLotRow({ row }: Props) {
  const { targetPrice } = row;

  return (
    <StyledStockNotificationRow>
      <StyledTableCell style={{ width: "1180px" }} align="left">
        {targetPrice}
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        {/* TODO: onClick */}
        <IconButton>
          <Icon icon="trash" size={16} color="gray600" />
        </IconButton>
      </StyledTableCell>
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
