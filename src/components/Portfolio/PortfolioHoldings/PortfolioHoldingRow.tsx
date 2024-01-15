import usePortfolioHoldingDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingDeleteMutation";
import { PortfolioHolding, PortfolioHoldingsSSE } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
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
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLots from "./PortfolioHoldingLots";

type GainOrLoss = "gain" | "loss" | "none";

type ChangeStatus = {
  currentValuation: GainOrLoss;
  currentPrice: GainOrLoss;
  dailyChange: GainOrLoss;
  dailyChangeRate: GainOrLoss;
  totalGain: GainOrLoss;
  totalReturnRate: GainOrLoss;
};

export default function PortfolioHoldingRow({
  portfolioId,
  labelId,
  row,
  sse,
  isItemSelected,
  handleClick,
}: {
  row: PortfolioHolding;
  sse: PortfolioHoldingsSSE;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
  portfolioId: number;
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
      if (sse) {
        const currentValue = sse[key];
        const previousValue = prevValues.current[key];

        if (currentValue > previousValue) {
          return "gain"; // 값이 증가했음
        } else if (currentValue < previousValue) {
          return "loss"; // 값이 감소했음
        } else {
          return "none"; // 값이 동일함
        }
      } else {
        return "none";
      }
    },
    [sse]
  );

  useEffect(() => {
    if (sse) {
      const newStatus = {
        currentValuation: checkValuesChange("currentValuation"),
        currentPrice: checkValuesChange("currentPrice"),
        dailyChange: checkValuesChange("dailyChange"),
        dailyChangeRate: checkValuesChange("dailyChangeRate"),
        totalGain: checkValuesChange("totalGain"),
        totalReturnRate: checkValuesChange("totalReturnRate"),
      };
      setChangeStatus(newStatus);

      const timer = setTimeout(() => {
        setChangeStatus({
          currentValuation: "none",
          currentPrice: "none",
          dailyChange: "none",
          dailyChangeRate: "none",
          totalGain: "none",
          totalReturnRate: "none",
        });
        prevValues.current = {
          currentValuation: sse.currentValuation,
          currentPrice: sse.currentPrice,
          dailyChange: sse.dailyChange,
          dailyChangeRate: sse.dailyChangeRate,
          totalGain: sse.totalGain,
          totalReturnRate: sse.totalReturnRate,
        };
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [sse, checkValuesChange]);

  const onConfirmDelete = () => {
    portfolioHoldingDeleteMutate({ portfolioId, portfolioHoldingId });
  };

  const onExpandRowClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setIsRowOpen(!isRowOpen);
  };

  return (
    <>
      <HoldingTableRow
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
              to={`/stock/${tickerSymbol}`}
              // to={`/portfolio/$${portfolioId}/holding/${portfolioHoldingId}`}
            >
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
          <ChangeableAmount $gainOrLoss={changeStatus.currentValuation}>
            ₩{thousandsDelimiter(sse?.currentValuation ?? currentValuation)}
          </ChangeableAmount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <ChangeableAmount $gainOrLoss={changeStatus.currentPrice}>
            ₩{thousandsDelimiter(sse?.currentPrice ?? currentPrice)}
          </ChangeableAmount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <Amount>₩{thousandsDelimiter(averageCostPerShare)}</Amount>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "64px" }} align="right">
          <Typography>{numShares}</Typography>
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "80px" }} align="right">
          <ChangeableAmount $gainOrLoss={changeStatus.dailyChange}>
            {thousandsDelimiter(sse?.dailyChange ?? dailyChange)}
          </ChangeableAmount>
          <RateBadge
            size={12}
            rate={sse?.dailyChangeRate ?? dailyChangeRate}
            bgColorStatus={false}
          />
        </HoldingTableCell>

        <HoldingTableCell style={{ width: "108px" }} align="right">
          <ChangeableAmount $gainOrLoss={changeStatus.totalGain}>
            ₩{thousandsDelimiter(sse?.totalGain ?? totalGain)}
          </ChangeableAmount>
          <RateBadge
            size={12}
            rate={sse?.totalReturnRate ?? totalReturnRate}
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
            rate={annualDividendYield}
            bgColorStatus={false}
          />
        </HoldingTableCell>
      </HoldingTableRow>

      <HoldingLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={10}>
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
        isOpen={isDeleteDialogOpen}
        title="종목을 삭제하시겠습니까?"
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}

const HoldingTableRow = styled(TableRow)`
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

const HoldingLotRow = styled(TableRow)`
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
        return color.state.green;
      case "loss":
        return color.state.red;
      default:
        return color.neutral.gray900;
    }
  }};
`;
