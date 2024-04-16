import { PortfolioHolding } from "@api/portfolio/types";
import RateBadge from "@components/common/Badges/RateBadge";
import { IconButton } from "@components/common/Buttons/IconButton";
import CheckBox from "@components/common/Checkbox/Checkbox";
import RealtimeValue from "@components/common/RealtimeValue";
import { thousandsDelimiter } from "@fineants/demolition";
import { Collapse, TableCell, TableRow, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { MouseEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLotsTable from "./PortfolioHoldingLots/PortfolioHoldingLotsTable";

type Props = {
  labelId: string;
  row: PortfolioHolding;
  isItemSelected: boolean;
  isAllRowsOpen: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
};

export default function PortfolioHoldingRow({
  labelId,
  row,
  isItemSelected,
  isAllRowsOpen,
  handleClick,
}: Props) {
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

  // TODO: Reduce rendering (currently renders twice)
  useEffect(() => {
    setIsRowOpen(isAllRowsOpen);
  }, [isAllRowsOpen]);

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
            icon={isRowOpen ? "chevron-down" : "chevron-right"}
            size="h24"
            iconColor="custom"
            customColor={{
              color: "gray400",
              hoverColor: "gray200",
            }}
            onClick={(event) => onExpandRowClick(event)}
          />
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
              style={{ font: designSystem.font.body3.font }}
              to={`/stock/${tickerSymbol}`}>
              {companyName}
            </Link>
          </Typography>
          <Typography
            style={{
              font: designSystem.font.body4.font,
              color: designSystem.color.neutral.gray400,
            }}>
            {tickerSymbol}
          </Typography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <RealtimeValue value={currentValuation}>
            ₩{thousandsDelimiter(currentValuation)}
          </RealtimeValue>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <RealtimeValue value={currentPrice}>
            ₩{thousandsDelimiter(currentPrice)}
          </RealtimeValue>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <Amount>₩{thousandsDelimiter(averageCostPerShare)}</Amount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "64px" }} align="right">
          <HoldingTypography>{numShares}</HoldingTypography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "80px" }} align="right">
          <RealtimeValue value={dailyChange}>
            ₩{thousandsDelimiter(dailyChange)}
          </RealtimeValue>
          <RateBadge
            size={12}
            value={dailyChangeRate ?? dailyChangeRate}
            bgColorStatus={false}
          />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <RealtimeValue value={totalGain}>
            ₩{thousandsDelimiter(totalGain)}
          </RealtimeValue>
          <RateBadge
            size={12}
            value={totalReturnRate ?? totalReturnRate}
            bgColorStatus={false}
          />
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
            value={annualDividendYield}
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
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const Amount = styled(HoldingTypography)`
  display: inline;
`;

const StyledHoldingLotRow = styled(TableRow)`
  width: 856px;
`;
