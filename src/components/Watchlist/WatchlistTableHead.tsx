import { WatchlistItemType } from "@api/watchlist";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  tableSortLabelClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { MouseEvent } from "react";
import styled from "styled-components";
import { Order } from "./WatchlistTable";

type HeadCell = {
  id: keyof WatchlistItemType;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "companyName",
    numeric: false,
    label: "종목명",
  },
  {
    id: "currentPrice",
    numeric: true,
    label: "현재가",
  },
  {
    id: "dailyChangeRate",
    numeric: true,
    label: "변동률",
  },
  {
    id: "annualDividendYield",
    numeric: true,
    label: "배당률",
  },
  {
    id: "sector",
    numeric: true,
    label: "업종",
  },
];

type Props = {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof WatchlistItemType
  ) => void;
};

export default function WatchlistTableHead({
  order,
  orderBy,
  onRequestSort,
}: Props) {
  const createSortHandler =
    (property: keyof WatchlistItemType) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledPortfolioListTableHead>
      <StyledTableRow>
        <StyledTableCell padding="none" />
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            sx={{
              width: headCell.id === "companyName" ? "368px" : "240px",
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
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
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
    font: ${({ theme: { font } }) => font.body5};
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  flex-direction: row;
  gap: 4px;
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;
