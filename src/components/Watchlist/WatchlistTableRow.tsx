import { WatchlistItemType } from "@api/watchlist";
import useWatchlistItemDeleteMutation from "@api/watchlist/queries/useWatchlistItemDeleteMutation";
import RateBadge from "@components/common/Badges/RateBadge";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { Icon } from "@components/common/Icon";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  row: WatchlistItemType;
};

export default function WatchlistTableRow({
  row: {
    companyName,
    tickerSymbol,
    currentPrice,
    dailyChange,
    dailyChangeRate,
    annualDividendYield,
    sector,
  },
}: Props) {
  const { mutate: watchlistItemDeleteMutate } =
    useWatchlistItemDeleteMutation(tickerSymbol);

  const onClick = () => {
    watchlistItemDeleteMutate();
  };

  return (
    <StyledTableRow>
      <StyledTableCell padding="none" sx={{ width: "16px" }}>
        <CustomTooltip title="관심 종목 삭제" placement="bottom-start">
          <IconButton
            sx={{ padding: 0 }}
            disableRipple={true}
            onClick={onClick}>
            <Icon icon="favorite" size={16} color="blue500" />
          </IconButton>
        </CustomTooltip>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ width: "368px" }}>
        <StyledLink to={`/stock/${tickerSymbol}`}>{companyName}</StyledLink>
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        ₩ {thousandsDelimiter(currentPrice ?? 0)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        <div>₩ {thousandsDelimiter(dailyChange ?? 0)}</div>
        <RateBadge rate={dailyChangeRate} bgColorStatus={false} />
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        {annualDividendYield.toString().padEnd(4, "0") ?? 0}%
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        {sector}
      </StyledTableCell>
    </StyledTableRow>
  );
}

const StyledTableRow = styled(TableRow)`
  height: 64px;

  &:hover {
    background-color: white;
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
  font: ${({ theme: { font } }) => font.body2};
  color: ${({ theme: { color } }) => color.neutral.gray800};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: ${({ theme: { color } }) => color.primary.blue500};
  }
`;
