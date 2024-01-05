import usePortfolioHoldingDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingDeleteMutation";
import { PortfolioHolding } from "@api/portfolio/types";
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
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLots from "./PortfolioHoldingLots";

export default function PortfolioHoldingRow({
  portfolioId,
  labelId,
  row,
  isItemSelected,
  handleClick,
}: {
  row: PortfolioHolding;
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

const ChangeableAmount = styled(Amount)<{ $isProfit: boolean }>`
  color: ${({ $isProfit, theme: { color } }) =>
    $isProfit ? color.state.green : color.state.red};
`;
