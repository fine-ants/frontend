import { PortfolioHolding } from "@api/portfolio/types";
import RateBadge from "@components/common/Badges/RateBadge";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { Icon } from "@components/common/Icon";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { MouseEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLotsTable from "./PortfolioHoldingLots/PortfolioHoldingLotsTable";

export default function PortfolioHoldingRow({
  labelId,
  row,
  isItemSelected,
  handleClick,
}: {
  labelId: string;
  row: PortfolioHolding;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
}) {
  const { portfolioId } = useParams();

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

  const [isRowOpen, setIsRowOpen] = useState(false);

  const onExpandRowClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setIsRowOpen(!isRowOpen);
  };

  return (
    <>
      <StyledHoldingTableRow
        tabIndex={-1}
        selected={isItemSelected}
        aria-checked={isItemSelected}
        onClick={(event) => handleClick(event, portfolioHoldingId)}>
        <HoldingTableCell
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
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "32px", padding: "0" }}>
          <CheckBox
            size="h16"
            checkType="check"
            checked={isItemSelected}
            inputProps={{
              "aria-label": labelId,
            }}
          />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "132px" }} component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <Link
              style={{ font: designSystem.font.body3 }}
              to={`/stock/${tickerSymbol}`}>
              {companyName}
            </Link>
          </Typography>
          <Typography
            style={{
              font: designSystem.font.body4,
              color: designSystem.color.neutral.gray400,
            }}>
            {tickerSymbol}
          </Typography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <Amount>₩{thousandsDelimiter(currentValuation)}</Amount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <ChangeableAmount $isProfit={currentPrice > averageCostPerShare}>
            ₩{thousandsDelimiter(currentPrice)}
          </ChangeableAmount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <Amount>₩{thousandsDelimiter(averageCostPerShare)}</Amount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "64px" }} align="right">
          <Typography>{numShares}</Typography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "80px" }} align="right">
          <HoldingTypography>
            {thousandsDelimiter(dailyChange)}
          </HoldingTypography>
          <RateBadge size={12} rate={dailyChangeRate} bgColorStatus={false} />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <HoldingTypography>
            ₩{thousandsDelimiter(totalGain)}
          </HoldingTypography>
          <RateBadge size={12} rate={totalReturnRate} bgColorStatus={false} />
        </HoldingTableCell>

        <HoldingTableCell
          style={{
            width: "116px",
            padding: "0 16px 0 8px",
          }}
          align="right">
          <HoldingTypography>
            ₩{thousandsDelimiter(annualDividend)}
          </HoldingTypography>
          <RateBadge
            size={12}
            rate={annualDividendYield}
            bgColorStatus={false}
          />
        </HoldingTableCell>
      </StyledHoldingTableRow>

      <StyledHoldingLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={10}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <PortfolioHoldingLotsTable
              portfolioId={Number(portfolioId)}
              portfolioHoldingId={portfolioHoldingId}
              purchaseHistory={purchaseHistory}
            />
          </Collapse>
        </TableCell>
      </StyledHoldingLotRow>
    </>
  );
}

const StyledHoldingTableRow = styled(TableRow)`
  &.Mui-selected {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
    border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.white};
  }

  &.Mui-selected:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray100};
  }

  &:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray100};
  }

  & > * {
    border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  }
`;

const HoldingTableCell = styled(TableCell)`
  padding: 0px 8px;
  height: 48px;

  > button {
    padding: 0;
  }
`;

const HoldingTypography = styled(Typography)`
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const Amount = styled(HoldingTypography)`
  display: inline;
`;

const StyledHoldingLotRow = styled(TableRow)`
  width: 856px;
`;

const ChangeableAmount = styled(Amount)<{ $isProfit: boolean }>`
  color: ${({ $isProfit, theme: { color } }) =>
    $isProfit ? color.state.green : color.state.red};
`;
