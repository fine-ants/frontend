import { PortfolioItem } from "@api/portfolio/types";
import RateBadge from "@components/common/Badges/RateBadge";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { TableCell, TableRow } from "@mui/material";
import securitiesFirmLogos from "@styles/securitiesFirmLogos";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type PortfolioListTableRowProps = {
  row: PortfolioItem;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
};

export default function PortfolioListTableRow({
  row: {
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
  },
  labelId,
  isItemSelected,
  handleClick,
}: PortfolioListTableRowProps) {
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
        <StyledLink to={`/portfolio/${id}`}>
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
        ₩ {thousandsDelimiter(currentValuation)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        ₩ {thousandsDelimiter(budget)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        <div>₩ {thousandsDelimiter(totalGain)}</div>
        <RateBadge rate={totalGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        <div>₩ {thousandsDelimiter(dailyGain)}</div>
        <RateBadge rate={dailyGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        ₩ {thousandsDelimiter(expectedMonthlyDividend)}
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
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  border-color: ${({ theme: { color } }) => color.neutral.gray100};
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};

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
      color: ${({ theme: { color } }) => color.primary.blue500};
    }
  }

  .portfolioName {
    font: ${({ theme: { font } }) => font.body2};
    color: ${({ theme: { color } }) => color.neutral.gray800};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
