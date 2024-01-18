import { WatchlistItemType } from "@api/watchlist";
import useWatchlistItemDeleteMutation from "@api/watchlist/queries/useWatchlistItemDeleteMutation";
import RateBadge from "@components/common/Badges/RateBadge";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { Icon } from "@components/common/Icon";
import { IconButton, TableCell, TableRow } from "@mui/material";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  row: WatchlistItemType;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
};

export default function WatchlistTableRow({
  row: {
    id,
    companyName,
    tickerSymbol,
    currentPrice,
    dailyChange,
    dailyChangeRate,
    annualDividendYield,
    sector,
  },
  labelId,
  isItemSelected,
  handleClick,
}: Props) {
  const { watchlistId } = useParams();

  const { mutate: watchlistItemDeleteMutate } = useWatchlistItemDeleteMutation(
    Number(watchlistId)
  );
  const onFavoriteMarkClick = (event: MouseEvent<unknown>) => {
    event.stopPropagation();
    watchlistItemDeleteMutate([tickerSymbol]);
  };

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
      <StyledTableCell padding="none" sx={{ width: "16px" }}>
        <CustomTooltip title="관심 종목 삭제" placement="bottom-start">
          <IconButton
            sx={{ padding: 0 }}
            disableRipple={true}
            onClick={onFavoriteMarkClick}>
            <Icon icon="favorite" size={16} color="blue500" />
          </IconButton>
        </CustomTooltip>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ width: "332px" }}>
        <StyledLink to={`/stock/${tickerSymbol}`}>{companyName}</StyledLink>
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        ₩ {thousandsDelimiter(currentPrice ?? 0)}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ width: "240px" }}>
        <div>₩ {thousandsDelimiter(dailyChange ?? 0)}</div>
        <RateBadge size={16} rate={dailyChangeRate} bgColorStatus={false} />
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

  &.Mui-selected {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
  }

  &:hover {
    background-color: white;
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  border-color: ${({ theme: { color } }) => color.neutral.gray100};
  font: ${designSystem.font.body3.font};
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
  font: ${designSystem.font.body2.font};
  color: ${({ theme: { color } }) => color.neutral.gray800};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: ${({ theme: { color } }) => color.primary.blue500};
  }
`;
