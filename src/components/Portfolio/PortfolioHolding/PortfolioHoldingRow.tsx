import { PortfolioHolding, PortfolioHoldingsSSE } from "@api/portfolio/types";
import RateBadge from "@components/common/Badges/RateBadge";
import { IconButton } from "@components/common/Buttons/IconButton";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { Collapse, TableCell, TableRow, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLotsTable from "./PortfolioHoldingLots/PortfolioHoldingLotsTable";

type GainOrLoss = "gain" | "loss" | "none";

type ChangeStatus = {
  currentValuation: GainOrLoss;
  currentPrice: GainOrLoss;
  dailyChange: GainOrLoss;
  dailyChangeRate: GainOrLoss;
  totalGain: GainOrLoss;
  totalReturnRate: GainOrLoss;
};

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
  const [changeStatus, setChangeStatus] = useState<ChangeStatus>({
    currentValuation: "none",
    currentPrice: "none",
    dailyChange: "none",
    dailyChangeRate: "none",
    totalGain: "none",
    totalReturnRate: "none",
  });

  const prevValues = useRef<PortfolioHoldingsSSE>({
    currentValuation: currentValuation,
    currentPrice: currentPrice,
    dailyChange: dailyChange,
    dailyChangeRate: dailyChangeRate,
    totalGain: totalGain,
    totalReturnRate: totalReturnRate,
  });

  const checkValuesChange = useCallback(
    (key: keyof PortfolioHoldingsSSE): GainOrLoss => {
      const currentValue = row[key];
      const previousValue = prevValues.current[key];

      if (currentValue > previousValue) {
        return "gain"; // 값이 증가했음
      } else if (currentValue < previousValue) {
        return "loss"; // 값이 감소했음
      } else {
        return "none"; // 값이 동일함
      }
    },
    [row]
  );

  const resyncValues = useCallback(() => {
    setChangeStatus({
      currentValuation: "none",
      currentPrice: "none",
      dailyChange: "none",
      dailyChangeRate: "none",
      totalGain: "none",
      totalReturnRate: "none",
    });
    prevValues.current = {
      currentValuation: currentValuation,
      currentPrice: currentPrice,
      dailyChange: dailyChange,
      dailyChangeRate: dailyChangeRate,
      totalGain: totalGain,
      totalReturnRate: totalReturnRate,
    };
  }, [
    currentValuation,
    currentPrice,
    dailyChange,
    dailyChangeRate,
    totalGain,
    totalReturnRate,
  ]);

  const onExpandRowClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setIsRowOpen(!isRowOpen);
  };

  useEffect(() => {
    const newStatus = {
      currentValuation: checkValuesChange("currentValuation"),
      currentPrice: checkValuesChange("currentPrice"),
      dailyChange: checkValuesChange("dailyChange"),
      dailyChangeRate: checkValuesChange("dailyChangeRate"),
      totalGain: checkValuesChange("totalGain"),
      totalReturnRate: checkValuesChange("totalReturnRate"),
    };
    setChangeStatus(newStatus);

    const timer = setTimeout(resyncValues, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [
    checkValuesChange,
    currentPrice,
    currentValuation,
    dailyChange,
    dailyChangeRate,
    totalGain,
    totalReturnRate,
    resyncValues,
  ]);

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
          <ChangeableAmount $gainOrLoss={changeStatus.currentValuation}>
            ₩{thousandsDelimiter(currentValuation ?? currentValuation)}
          </ChangeableAmount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <ChangeableAmount $gainOrLoss={changeStatus.currentPrice}>
            ₩{thousandsDelimiter(currentPrice ?? currentPrice)}
          </ChangeableAmount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <Amount>₩{thousandsDelimiter(averageCostPerShare)}</Amount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "64px" }} align="right">
          <HoldingTypography>{numShares}</HoldingTypography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "80px" }} align="right">
          <ChangeableAmount $gainOrLoss={changeStatus.dailyChange}>
            {thousandsDelimiter(dailyChange ?? dailyChange)}
          </ChangeableAmount>
          <RateBadge
            size={12}
            value={dailyChangeRate ?? dailyChangeRate}
            bgColorStatus={false}
          />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <ChangeableAmount $gainOrLoss={changeStatus.totalGain}>
            ₩{thousandsDelimiter(totalGain ?? totalGain)}
          </ChangeableAmount>
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

const ChangeableAmount = styled(Amount)<{
  $gainOrLoss: GainOrLoss;
}>`
  color: ${({ $gainOrLoss, theme: { color } }) => {
    switch ($gainOrLoss) {
      case "none":
        return color.neutral.gray900;
      case "gain":
        return color.state.green500;
      case "loss":
        return color.state.red500;
      default:
        return color.neutral.gray900;
    }
  }};
`;
