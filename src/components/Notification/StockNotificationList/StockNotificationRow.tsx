import { Icon } from "@components/common/Icon";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StockNotification } from "./StockNotificationListTable";

type Props = {
  row: StockNotification;
  isAllRowsOpen: boolean;
};

export default function StockNotificationRow({ row, isAllRowsOpen }: Props) {
  const { companyName, tickerSymbol, lastPrice } = row;

  const [isRowOpen, setIsRowOpen] = useState(false);

  const onExpandRowClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setIsRowOpen(!isRowOpen);
  };

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

        <StyledTableCell style={{ width: "132px" }} component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <StyledLink
              style={{ font: designSystem.font.body3.font }}
              to={`/stock/${tickerSymbol}`}>
              {companyName}
            </StyledLink>
          </Typography>
        </StyledTableCell>

        <StyledTableCell style={{ width: "140px" }} align="center">
          <p>{lastPrice}</p>
        </StyledTableCell>

        <StyledTableCell style={{ width: "140px" }} align="center">
          <IconButton>
            <Icon icon="notification" size={24} color="blue500" />
          </IconButton>
        </StyledTableCell>
      </StyledStockNotificationRow>

      <StyledLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={10}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <div>hello</div>
            {/* TODO: StockNotificationLotsTable */}
            {/* <PortfolioHoldingLotsTable
              portfolioId={Number(portfolioId)}
              portfolioHoldingId={portfolioHoldingId}
              purchaseHistory={purchaseHistory}
            /> */}
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

const StyledLotRow = styled(TableRow)`
  width: 856px;
`;
