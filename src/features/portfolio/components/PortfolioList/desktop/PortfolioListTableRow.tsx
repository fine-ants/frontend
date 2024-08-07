import RateBadge from "@components/Badges/RateBadge";
import CheckBox from "@components/Checkbox";
import { securitiesFirmLogos } from "@constants/securitiesFirm";
import { PortfolioItem } from "@features/portfolio/api/types";
import { thousandsDelimiter } from "@fineants/demolition";
import { TableCell, TableRow } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  row: PortfolioItem;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
};

export default function PortfolioListTableRow({
  row,
  labelId,
  isItemSelected,
  handleClick,
}: Props) {
  const {
    id,
    name,
    securitiesFirm,
    currentValuation,
    budget,
    totalGain,
    totalGainRate,
    dailyGain,
    dailyGainRate,
    expectedMonthlyDividend,
    numShares,
  } = row;

  return (
    <StyledTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      selected={isItemSelected}
      aria-checked={isItemSelected}
      onClick={(event) => handleClick(event, id)}>
      <StyledTableCell padding="checkbox">
        <CheckBox
          size="h20"
          checkType="check"
          checked={isItemSelected}
          inputProps={{
            "aria-label": labelId,
          }}
        />
      </StyledTableCell>
      <StyledTableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        sx={{ width: "338px" }}>
        <StyledLink to={Routes.PORTFOLIO(id)}>
          <img
            src={securitiesFirmLogos[securitiesFirm]}
            alt={securitiesFirm}
            width="40px"
            height="40px"
          />
          <span className="portfolioName">{name}</span>
        </StyledLink>
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        {thousandsDelimiter(currentValuation)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        {thousandsDelimiter(budget)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        <div>{thousandsDelimiter(totalGain)}</div>
        <RateBadge size={16} value={totalGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        <div>{thousandsDelimiter(dailyGain)}</div>
        <RateBadge size={16} value={dailyGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        {thousandsDelimiter(expectedMonthlyDividend)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "136px" }}>
        {thousandsDelimiter(numShares)}
      </StyledTableCell>
    </StyledTableRow>
  );
}

const StyledTableRow = styled(TableRow)`
  height: 64px;

  &.Mui-selected {
    background-color: ${designSystem.color.neutral.gray50};
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

  &:hover {
    .portfolioName {
      color: ${designSystem.color.primary.blue500};
    }
  }

  .portfolioName {
    font: ${designSystem.font.body2.font};
    color: ${designSystem.color.neutral.gray800};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
