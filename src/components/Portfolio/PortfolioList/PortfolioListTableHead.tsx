import { PortfolioItem } from "@api/portfolio/types";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
import CheckBox from "@components/common/Checkbox/Checkbox";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  tableSortLabelClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { Order } from "./PortfolioListTable";

type HeadCell = {
  id: keyof PortfolioItem;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "이름",
  },
  {
    id: "currentValuation",
    numeric: true,
    label: "평가 금액",
  },
  {
    id: "budget",
    numeric: true,
    label: "투자 예산",
  },
  {
    id: "totalGain",
    numeric: true,
    label: "총 손익",
  },
  {
    id: "dailyGain",
    numeric: true,
    label: "당일 손익",
  },
  {
    id: "expectedMonthlyDividend",
    numeric: true,
    label: "당월 예상 배당금",
  },
  {
    id: "numShares",
    numeric: true,
    label: "종목 개수",
  },
];

type PortfolioListTableHeadProps = {
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof PortfolioItem
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function PortfolioListTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
}: PortfolioListTableHeadProps) {
  const createSortHandler =
    (property: keyof PortfolioItem) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledPortfolioListTableHead>
      <StyledTableRow>
        <StyledTableCell padding="none">
          <CheckBox
            size={20}
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
