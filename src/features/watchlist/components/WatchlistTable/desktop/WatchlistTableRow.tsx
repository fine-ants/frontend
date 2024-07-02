import RateBadge from "@components/Badges/RateBadge";
import CheckBox from "@components/Checkbox";
import { WatchlistItemType } from "@features/watchlist/api";
import { thousandsDelimiter } from "@fineants/demolition";
import { TableCell, TableRow } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  row: WatchlistItemType;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
};

export default function WatchlistTableRow({
  row,
  labelId,
  isItemSelected,
  handleClick,
}: Props) {
  const {
    id,
    companyName,
    tickerSymbol,
    currentPrice,
    dailyChange,
    dailyChangeRate,
    annualDividendYield,
    sector,
  } = row;

  return (
    <StyledTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      selected={isItemSelected}
      aria-checked={isItemSelected}
      onClick={(event) => handleClick(event, id)}>
      <StyledTableCell sx={{ width: "36px" }} padding="checkbox">
        <CheckBox
          size="h20"
          checkType="check"
          checked={isItemSelected}
          inputProps={{
            "aria-label": labelId,
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ width: "332px" }}>
        <StyledLink to={Routes.STOCK(tickerSymbol)}>{companyName}</StyledLink>
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        {thousandsDelimiter(currentPrice)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        <div>{thousandsDelimiter(dailyChange)}</div>
        <RateBadge size={16} value={dailyChangeRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        {annualDividendYield === 0
          ? 0
          : annualDividendYield.toString().padEnd(4, "0")}
        %
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        {sector}
      </StyledTableCell>
    </StyledTableRow>
  );
}

const StyledTableRow = styled(TableRow)`
  height: 64px;

  &.Mui-selected {
    background-color: ${designSystem.color.neutral.gray50};
  }

  &:hover {
    background-color: white;
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  border-color: ${designSystem.color.neutral.gray100};
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};

  &:first-of-type {
    padding-left: 16px;
  }

  &:last-of-type {
    padding-right: 16px;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  max-width: 274px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.body2.font};
  color: ${designSystem.color.neutral.gray800};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: ${designSystem.color.primary.blue500};
  }
`;
