import RateBadge from "@components/Badges/RateBadge";
import { IconButton } from "@components/Buttons/IconButton";
import CheckBox from "@components/Checkbox";
import { EllipsisTextTooltip } from "@components/Tooltips/EllipsisTextTooltip";
import { PortfolioHolding } from "@features/portfolio/api/types";
import RealtimeValue from "@features/portfolio/components/RealtimeValue";
import { thousandsDelimiter } from "@fineants/demolition";
import { Collapse, TableCell, TableRow, Typography } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent, memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLotsTableD from "./PortfolioHoldingLots/PortfolioHoldingLotsTableD";

type Props = {
  labelId: string;
  isItemSelected: boolean;
  isAllRowsOpen: boolean;
  handleClick: (event: MouseEvent<unknown>, row: PortfolioHolding) => void;
} & PortfolioHolding;

export default memo(PortfolioHoldingRow);

function PortfolioHoldingRow({
  labelId,
  isItemSelected,
  isAllRowsOpen,
  handleClick,
  ...row
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

  const onExpandRowClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.stopPropagation();
      setIsRowOpen((prev) => !prev);
    },
    []
  );

  // TODO: Reduce rendering (currently renders twice)
  useEffect(() => {
    setIsRowOpen(isAllRowsOpen);
  }, [isAllRowsOpen]);

  return (
    <>
      <StyledHoldingTableRow
        tabIndex={-1}
        selected={isItemSelected}
        onClick={(event) => handleClick(event, row)}
        aria-selected={isItemSelected}>
        <MemoizedHoldingTableCell
          isRowOpen={isRowOpen}
          onExpandRowClick={onExpandRowClick}
        />

        <MemoizedCheckBoxCell
          isItemSelected={isItemSelected}
          labelId={labelId}
        />

        <MemoizedCompanyInfoCell
          companyName={companyName}
          tickerSymbol={tickerSymbol}
        />

        <MemoizedTableCell value={currentValuation} width="108px" />
        <MemoizedTableCell value={currentPrice} width="108px" />
        <MemoizedAmountCell value={averageCostPerShare} width="108px" />
        <MemoizedTextCell text={numShares} width="64px" />
        <MemoizedTableCellWithRateBadge
          value={dailyChange}
          rate={dailyChangeRate}
          width="80px"
        />
        <MemoizedTableCellWithRateBadge
          value={totalGain}
          rate={totalReturnRate}
          width="108px"
        />
        <MemoizedTableCellWithRateBadge
          value={annualDividend}
          rate={annualDividendYield}
          width="116px"
        />
      </StyledHoldingTableRow>

      <StyledHoldingLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={10}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <PortfolioHoldingLotsTableD
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

const MemoizedHoldingTableCell = memo(
  ({
    isRowOpen,
    onExpandRowClick,
  }: {
    isRowOpen: boolean;
    onExpandRowClick: (event: MouseEvent<HTMLButtonElement>) => void;
  }) => (
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
        onClick={onExpandRowClick}
        aria-label="포트폴리오 종목 펼치기 버튼"
      />
    </HoldingTableCell>
  )
);

const MemoizedCheckBoxCell = memo(
  ({
    isItemSelected,
    labelId,
  }: {
    isItemSelected: boolean;
    labelId: string;
  }) => (
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
  )
);

const MemoizedCompanyInfoCell = memo(
  ({
    companyName,
    tickerSymbol,
  }: {
    companyName: string;
    tickerSymbol: string;
  }) => (
    <HoldingTableCell style={{ width: "132px" }}>
      <Typography sx={{ fontSize: "1rem" }} component="h3">
        <Link
          style={{ font: designSystem.font.body3.font }}
          to={Routes.STOCK(tickerSymbol)}>
          <EllipsisTextTooltip defaultMaxWidth="116px">
            {companyName}
          </EllipsisTextTooltip>
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
  )
);

const MemoizedTableCell = memo(
  ({
    value,
    width,
    align = "right",
  }: {
    value: number;
    width: string;
    align?: "left" | "right";
  }) => (
    <HoldingTableCell style={{ width }} align={align}>
      <RealtimeValue value={value} />
    </HoldingTableCell>
  )
);

const MemoizedTableCellWithRateBadge = memo(
  ({ value, rate, width }: { value: number; rate: number; width: string }) => (
    <HoldingTableCell style={{ width }} align="right">
      <RealtimeValue value={value} />
      <div>
        <RateBadge size={12} value={rate} bgColorStatus={false} />
      </div>
    </HoldingTableCell>
  )
);

const MemoizedAmountCell = memo(
  ({ value, width }: { value: number; width: string }) => (
    <HoldingTableCell style={{ width }} align="right">
      <Amount>{thousandsDelimiter(value)}</Amount>
    </HoldingTableCell>
  )
);

const MemoizedTextCell = memo(
  ({ text, width }: { text: number; width: string }) => (
    <HoldingTableCell style={{ width }} align="right">
      <HoldingTypography>{text}</HoldingTypography>
    </HoldingTableCell>
  )
);

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
