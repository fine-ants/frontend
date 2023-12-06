import { PortfolioItem } from "@api/portfolio/types";
import RateBadge from "@components/common/Badges/RateBadge";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { Link, TableCell, TableRow } from "@mui/material";
import securitiesFirmLogos from "@styles/securitiesFirmLogos";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { MouseEvent } from "react";
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
      <StyledTableCell component="th" id={labelId} scope="row" padding="none">
        <StyledLink
          href={`/portfolio/${id}`}
          underline="none"
          sx={{
            height: "100%",
            display: "flex",
            gap: "8px",
          }}>
          <img
            src={securitiesFirmLogos[securitiesFirm]}
            alt={securitiesFirm}
            width="40px"
            height="40px"
          />
          {/* TODO: handle long names */}
          <span className="portfolioName">{name}</span>
        </StyledLink>
      </StyledTableCell>
      <StyledTableCell align="right">
        ₩ {thousandsDelimiter(currentValuation)}
      </StyledTableCell>
      <StyledTableCell align="right">
        ₩ {thousandsDelimiter(budget)}
      </StyledTableCell>
      <StyledTableCell align="right">
        <div>₩ {thousandsDelimiter(totalGain)}</div>
        <RateBadge rate={totalGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right">
        <div>₩ {thousandsDelimiter(dailyGain)}</div>
        <RateBadge rate={dailyGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right">
        ₩ {thousandsDelimiter(expectedMonthlyDividend)}
      </StyledTableCell>
      <StyledTableCell align="right">
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
  width: 100%; // TODO!!!!!!!!!!!!!!!!!
  max-width: 274px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  .portfolioName {
    font: ${({ theme: { font } }) => font.body2};
    color: ${({ theme: { color } }) => color.neutral.gray800};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
