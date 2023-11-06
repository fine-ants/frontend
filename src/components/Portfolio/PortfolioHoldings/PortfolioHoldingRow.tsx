import { PortfolioHolding } from "@api/portfolio";
import usePortfolioHoldingDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingDeleteMutation";
import ConfirmAlert from "@components/ConfirmAlert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLots from "./PortfolioHoldingLots";

export default function PortfolioHoldingRow({
  portfolioId,
  row,
}: {
  portfolioId: number;
  row: PortfolioHolding;
}) {
  const {
    companyName,
    tickerSymbol,
    portfolioHoldingId,
    currentValuation,
    currentPrice,
    averageCostPerShare,
    numShares,
    dailyChange,
    dailyChangeRate,
    totalGain,
    totalReturnRate,
    annualDividend,
    annualDividendYield,
    purchaseHistory,
  } = row;

  const { mutate: portfolioHoldingDeleteMutate } =
    usePortfolioHoldingDeleteMutation(portfolioId);

  const [isRowOpen, setIsRowOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = () => {
    portfolioHoldingDeleteMutate({ portfolioId, portfolioHoldingId });
  };

  const onExpandRowClick = () => {
    setIsRowOpen(!isRowOpen);
  };

  return (
    <>
      <HoldingTableRow>
        <HoldingTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={onExpandRowClick}>
            {isRowOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </HoldingTableCell>
        <HoldingTableCell component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <Link
              to={`/portfolio/$${portfolioId}/holding/${portfolioHoldingId}`}>
              {companyName}
            </Link>
          </Typography>
          <Typography>{tickerSymbol}</Typography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Amount>{currentValuation}</Amount>
          <Currency>KRW</Currency>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <ChangeableAmount $isProfit={currentPrice > averageCostPerShare}>
            {currentPrice}
          </ChangeableAmount>
          <Currency>KRW</Currency>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Amount>{averageCostPerShare}</Amount>
          <Currency>KRW</Currency>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Typography>{numShares}</Typography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <ChangeableTypography $isProfit={!(dailyChangeRate < 0)}>
            {dailyChangeRate}%
          </ChangeableTypography>
          <ChangeableTypography $isProfit={!(dailyChange < 0)}>
            {dailyChange}
          </ChangeableTypography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <ChangeableTypography $isProfit={!(totalReturnRate < 0)}>
            {totalReturnRate}%
          </ChangeableTypography>
          <ChangeableTypography $isProfit={!(totalGain < 0)}>
            {totalGain}
          </ChangeableTypography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <ChangeableTypography $isProfit={!(annualDividendYield < 0)}>
            {annualDividendYield}%
          </ChangeableTypography>
          <ChangeableTypography $isProfit={!(annualDividend < 0)}>
            {annualDividend}
          </ChangeableTypography>
        </HoldingTableCell>
        <TableCell style={{ border: "1px solid black", cursor: "pointer" }}>
          <Button onClick={onDeleteClick}>삭제</Button>
        </TableCell>
      </HoldingTableRow>
      <HoldingLotRow>
        <TableCell
          style={{ padding: "0 0 0 68.5px", border: "none" }}
          colSpan={9}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <PortfolioHoldingLots
              portfolioId={portfolioId}
              portfolioHoldingId={portfolioHoldingId}
              purchaseHistory={purchaseHistory}
            />
          </Collapse>
        </TableCell>
      </HoldingLotRow>

      <ConfirmAlert
        isOpen={isDeleteModalOpen}
        title="종목 삭제"
        content="종목을 삭제하시겠습니까?"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}

const HoldingTableRow = styled(TableRow)`
  height: 46px;

  & > * {
    border-bottom: unset;
  }
`;

const HoldingTableCell = styled(TableCell)`
  padding: 16px 0 0 0;
`;

const Amount = styled(Typography)`
  display: inline;
`;

const Currency = styled(Typography)`
  padding-left: 2px;
  display: inline;
  color: #8b8b8b;
  font-size: 10px;
`;

const HoldingLotRow = styled(TableRow)``;

const ChangeableTypography = styled(Typography)<{ $isProfit: boolean }>`
  color: ${({ $isProfit }) =>
    $isProfit ? "rgb(8, 153, 129)" : "rgb(242, 54, 69)"};
`;

const ChangeableAmount = styled(Amount)<{ $isProfit: boolean }>`
  color: ${({ $isProfit }) =>
    $isProfit ? "rgb(8, 153, 129)" : "rgb(242, 54, 69)"};
`;
