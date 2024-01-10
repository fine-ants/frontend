import { WatchlistsType } from "@api/watchlist";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { TableCell, TableRow } from "@mui/material";
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
        <StyledLink to={`/watchlists/${id}`}>{name}</StyledLink>
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
  font: ${({ theme: { font } }) => font.body3.font};
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
  font: ${({ theme: { font } }) => font.body2.font};
  color: ${({ theme: { color } }) => color.neutral.gray800};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: ${({ theme: { color } }) => color.primary.blue500};
  }
`;
