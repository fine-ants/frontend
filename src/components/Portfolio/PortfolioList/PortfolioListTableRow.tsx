import { PortfolioItem } from "@api/portfolio/types";
import RateBadge from "@components/common/Badges/DeltaBadge";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { TableCell, TableRow } from "@mui/material";
import designSystem from "@styles/designSystem";
import securitiesFirmLogos from "@styles/securitiesFirmLogos";
import { thousandsDelimiter } from "@utils/delimiters";
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
        ₩ {thousandsDelimiter(currentValuation ?? 0)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        ₩ {thousandsDelimiter(budget ?? 0)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        <div>₩ {thousandsDelimiter(totalGain ?? 0)}</div>
        <RateBadge size={16} value={totalGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        <div>₩ {thousandsDelimiter(dailyGain ?? 0)}</div>
        <RateBadge size={16} value={dailyGainRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "170px" }}>
        ₩ {thousandsDelimiter(expectedMonthlyDividend ?? 0)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "136px" }}>
        {thousandsDelimiter(numShares ?? 0)}
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
