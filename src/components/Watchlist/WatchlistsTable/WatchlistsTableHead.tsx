import { WatchlistsType } from "@api/watchlist";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { Order } from "@components/common/Table/Table";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  tableSortLabelClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import designSystem from "@styles/designSystem";
import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";

type HeadCell = {
  id: keyof WatchlistsType;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "이름",
  },
];

type Props = {
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof WatchlistsType
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function WatchlistsTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
}: Props) {
  const createSortHandler =
    (property: keyof WatchlistsType) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledPortfolioListTableHead>
      <StyledTableRow>
        <StyledTableCell sx={{ width: "36px" }} padding="none">
          <CheckBox
            size="h20"
            checkType="indet"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all portfolios",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            sx={{
              width: "100%",
            }}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() => {
                const isOrderBy = orderBy === headCell.id;

                if (!isOrderBy) return <img src={sortNoneIcon} />;

                if (order === "asc") {
                  return <img src={sortAscendingIcon} />;
                } else {
                  return <img src={sortDescendingIcon} />;
                }
              }}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
      <TableRow sx={{ height: "8px" }} />
    </StyledPortfolioListTableHead>
  );
}

const StyledPortfolioListTableHead = styled(TableHead)`
  height: 56px;
`;

const StyledTableRow = styled(TableRow)`
  height: 48px;
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  background-color: ${designSystem.color.neutral.gray50};
  border: none;

  &:first-of-type {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-of-type {
    padding-right: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  & > .${tableSortLabelClasses.root} {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  &.Mui-active {
    color: ${designSystem.color.neutral.gray600};
  }

  flex-direction: row;
  gap: 4px;
  color: ${designSystem.color.neutral.gray600};
`;
