import { PortfolioHolding } from "@api/portfolio/types";
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import designSystem from "@styles/designSystem";
import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { Order } from "./PortfolioHoldingsTable";

type PortfolioHoldingsTableHeadProps = {
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof PortfolioHolding
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

type HeadCell = {
  id: keyof PortfolioHolding;
  label: string;
  numeric: boolean;
  size: string;
};

const headCells: readonly HeadCell[] = [
  {
    id: "companyName",
    numeric: false,
    label: "종목명",
    size: "132px",
  },
  {
    id: "currentValuation",
    numeric: true,
    label: "평가 금액",
    size: "108px",
  },
  {
    id: "currentPrice",
    numeric: true,
    label: "현재가",
    size: "108px",
  },
  {
    id: "averageCostPerShare",
    numeric: true,
    label: "평균 매입가",
    size: "108px",
  },
  {
    id: "numShares",
    numeric: true,
    label: "개수",
    size: "64px",
  },
  {
    id: "dailyChangeRate",
    numeric: true,
    label: "변동률",
    size: "80px",
  },
  {
    id: "totalGain",
    numeric: true,
    label: "총 손익",
    size: "108px",
  },
  {
    id: "annualDividend",
    numeric: true,
    label: "연 배당금",
    size: "116px",
  },
];

export default function PortfolioHoldingsTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
}: PortfolioHoldingsTableHeadProps) {
  const createSortHandler =
    (property: keyof PortfolioHolding) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <CustomTableHead>
      <ColumnHeader
        style={{
          backgroundColor: designSystem.color.neutral.gray50,
        }}>
        <ColumnHeaderCell
          style={{
            width: "32px",
            boxSizing: "border-box",
            borderRadius: "8px 0 0 8px",
          }}
        />
        <ColumnHeaderCell style={{ width: "32px" }}>
          <CheckBox
            size="h16"
            checkType="indet"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </ColumnHeaderCell>
        {headCells.map((headCell, index) => (
          <ColumnHeaderCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            style={{
              width: headCell.size,
              borderRadius:
                index === headCells.length - 1 ? "0 8px 8px 0" : "0",
              padding:
                index === headCells.length - 1 ? "0 16px 0 8px" : "0 8px",
            }}
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
          </ColumnHeaderCell>
        ))}
      </ColumnHeader>
      <TableRow sx={{ height: "8px" }} />
    </CustomTableHead>
  );
}

const CustomTableHead = styled(TableHead)`
  height: 48px;
  width: 100%;
  padding: 0 8px;
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
  border-radius: 8px;

  & .MuiTableCell-root {
    border-bottom: none;
    color: ${({ theme: { color } }) => color.neutral.gray600};
    font: ${({ theme: { font } }) => font.title5};
  }
`;

const ColumnHeader = styled(TableRow)`
  width: 100%;
  background-color: #f6f6f8;

  & > last-child {
    border-radius: 0 8px 8px 0;
    padding: 0 16px 0 8px;
  }
`;

const ColumnHeaderCell = styled(TableCell)`
  padding: 4px 8px;

  height: 48px;

  > span {
    width: auto;
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  flex-direction: row;
  gap: 4px;
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;
