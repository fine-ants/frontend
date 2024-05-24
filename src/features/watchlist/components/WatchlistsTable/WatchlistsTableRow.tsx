import CheckBox from "@components/Checkbox";
import { WatchlistsType } from "@features/watchlist/api";
import { TableCell, TableRow } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  row: WatchlistsType;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: MouseEvent<unknown>, id: number) => void;
};

export default function WatchlistsTableRow({
  row: { id, name },
  labelId,
  isItemSelected,
  handleClick,
}: Props) {
  // const { mutate: watchlistItemDeleteMutate } =
  //   useWatchlistItemDeleteMutation(id);

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

      <StyledTableCell align="left" sx={{ width: "368px" }}>
        <StyledLink to={Routes.WATCHLIST(id)}>{name}</StyledLink>
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
