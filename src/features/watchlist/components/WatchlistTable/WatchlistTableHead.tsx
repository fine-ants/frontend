import CheckBox from "@components/Checkbox";
import { Icon } from "@components/Icon";
import { Order } from "@components/Table/types";
import { WatchlistItemType } from "@features/watchlist/api";
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
    label: "섹터",
  },
];

type Props = {
  order: Order;
  orderBy: string;
  isAllRowsSelectedInCurrentPage: boolean;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof WatchlistItemType
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function WatchlistTableHead({
  order,
  orderBy,
  isAllRowsSelectedInCurrentPage,
  onRequestSort,
  onSelectAllClick,
}: Props) {
  const createSortHandler =
    (property: keyof WatchlistItemType) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledPortfolioListTableHead>
      <StyledTableRow>
        <StyledTableCell sx={{ width: "36px" }} padding="none">
          <CheckBox
            size="h20"
            checkType="indet"
            checked={isAllRowsSelectedInCurrentPage}
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
              width: headCell.id === "companyName" ? "332px" : "240px",
            }}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() => {
                const isOrderBy = orderBy === headCell.id;

                return isOrderBy ? (
                  <Icon
                    icon={
                      order === "asc" ? "sort_ascending" : "sort_descending"
                    }
                    size={16}
                    color="#373840"
                  />
                ) : (
                  <Icon icon="sort_none" size={16} color="gray600" />
                );
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
  flex-direction: row;
  gap: 4px;
  color: ${designSystem.color.neutral.gray600};
`;
