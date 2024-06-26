import RateBadge from "@components/Badges/RateBadge";
import { IconButton } from "@components/Buttons/IconButton";
import CheckBox from "@components/Checkbox";
import { PortfolioHolding } from "@features/portfolio/api/types";
import RealtimeValue from "@features/portfolio/components/RealtimeValue";
import { thousandsDelimiter } from "@fineants/demolition";
import { Collapse, TableCell, TableRow, Typography } from "@mui/material";
import Routes from "@router/Routes";
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
    id,
    companyName,
    tickerSymbol,
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
        onClick={(event) => handleClick(event, id)}
        aria-selected={isItemSelected}>
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
            aria-label="포트폴리오 종목 펼치기 버튼"
          />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "32px", padding: "0" }}>
          <CheckBox
            size="h16"
            checkType="check"
            checked={isItemSelected}
            aria-checked={isItemSelected}
            inputProps={{
              "aria-label": labelId,
            }}
          />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "132px" }}>
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <Link
              style={{ font: designSystem.font.body3.font }}
              to={Routes.STOCK(tickerSymbol)}>
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
          <RealtimeValue value={currentValuation} />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <RealtimeValue value={currentPrice} />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <Amount>{thousandsDelimiter(averageCostPerShare)}</Amount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "64px" }} align="right">
          <HoldingTypography>{numShares}</HoldingTypography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "80px" }} align="right">
          <RealtimeValue value={dailyChange} />
          <div>
            <RateBadge
              size={12}
              value={dailyChangeRate}
              bgColorStatus={false}
            />
          </div>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <RealtimeValue value={totalGain} />
          <div>
            <RateBadge
              size={12}
              value={totalReturnRate}
              bgColorStatus={false}
            />
          </div>
        </HoldingTableCell>

        <HoldingTableCell
          style={{
            width: "116px",
            padding: "0 16px 0 8px",
          }}
          align="right">
          <HoldingTypography>
            {thousandsDelimiter(annualDividend)}
          </HoldingTypography>
          <div>
            <RateBadge
              size={12}
              value={annualDividendYield}
              bgColorStatus={false}
            />
          </div>
        </HoldingTableCell>
      </StyledHoldingTableRow>

      <StyledHoldingLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={10}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <PortfolioHoldingLotsTable
              portfolioId={Number(portfolioId)}
              portfolioHoldingId={id}
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
