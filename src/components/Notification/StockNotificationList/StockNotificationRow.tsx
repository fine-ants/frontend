import useStockNotificationSettingsMutation from "@api/notifications/queries/useStockNotificationSettingsMutation";
import { StockNotification } from "@api/notifications/types";
import { Icon } from "@components/common/Icon";
import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  debounce,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StockNotificationLotsTable from "./StockNotificationLotsTable/StockNotificationLotsTable";

type Props = {
  row: StockNotification;
  isAllRowsOpen: boolean;
};

export default function StockNotificationRow({ row, isAllRowsOpen }: Props) {
  const { companyName, tickerSymbol, lastPrice, isActive } = row;

  const { mutate } = useStockNotificationSettingsMutation(tickerSymbol);

  const [isRowOpen, setIsRowOpen] = useState(false);

  const onExpandRowClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setIsRowOpen(!isRowOpen);
  };

  const onNotificationButtonClick = debounce(() => {
    mutate({ isActive: !isActive });
  }, 250);

  // TODO: Reduce rendering (currently renders twice)
  useEffect(() => {
    setIsRowOpen(isAllRowsOpen);
  }, [isAllRowsOpen]);

  return (
    <>
      <StyledStockNotificationRow>
        <StyledTableCell
          style={{
            width: "40px",
            padding: "0 8px 0 16px",
          }}>
          <IconButton
            style={{
              width: "16px",
              height: "16px",
            }}
            aria-label="expand row"
            size="small"
            onClick={(event) => onExpandRowClick(event)}>
            <Icon
              icon={isRowOpen ? "chevron-down" : "chevron-right"}
              size={16}
              color={"gray400"}
            />
          </IconButton>
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <StyledLink
              style={{ font: designSystem.font.body3.font }}
              to={`/stock/${tickerSymbol}`}>
              {companyName}
            </StyledLink>
          </Typography>
        </StyledTableCell>

        <StyledTableCell style={{ width: "120px" }} align="center">
          <p>{lastPrice}</p>
        </StyledTableCell>

        <StyledTableCell style={{ width: "120px" }} align="center">
          <IconButton onClick={onNotificationButtonClick}>
            <Icon
              icon="notification"
              size={24}
              color={isActive ? "blue500" : "gray400"}
            />
          </IconButton>
        </StyledTableCell>

        <StyledTableCell style={{ width: "120px" }} align="center">
          {/* TODO: onClick */}
          <Button onClick={() => {}}>
            <Icon icon="trash" size={16} color="gray600" />
            <DeleteText>전체 삭제</DeleteText>
          </Button>
        </StyledTableCell>
      </StyledStockNotificationRow>

      <StyledLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={5}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <StockNotificationLotsTable
              data={row.targetPrices.map((item) => ({ ...item, companyName }))}
            />
          </Collapse>
        </TableCell>
      </StyledLotRow>
    </>
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
`;

const StyledTableCell = styled(TableCell)`
  height: 48px;
  padding: 0px 8px;

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

const StyledLink = styled(Link)`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray800};

  &:hover {
    color: ${designSystem.color.primary.blue500};
  }
`;

const DeleteText = styled.span`
  margin-left: 4px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const StyledLotRow = styled(TableRow)`
  width: 856px;
  padding-top: 8px;
`;
