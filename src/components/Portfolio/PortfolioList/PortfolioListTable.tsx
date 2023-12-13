import usePortfolioListTableQuery from "@api/portfolio/queries/usePortfolioListTableQuery";
import { PortfolioItem } from "@api/portfolio/types";
import TablePagination from "@components/common/Pagination/TablePagination";
import { Box, Table, TableContainer, tableRowClasses } from "@mui/material";
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import PortfolioListTableBody from "./PortfolioListTableBody";
import PortfolioListTableHead from "./PortfolioListTableHead";
import PortfolioListTableToolBar from "./PortfolioListTableToolBar";

export type Order = "asc" | "desc";

export default function PortfolioListTable() {
  const { data: portfolioItems } = usePortfolioListTableQuery();

  const portfolioRows = portfolioItems.portfolios;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof PortfolioItem>("dateCreated");
  const [selected, setSelected] = useState<readonly PortfolioItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof PortfolioItem
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const updateSelected = (newSelected: readonly PortfolioItem[]) => {
    setSelected(newSelected);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const numEmptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - portfolioRows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rowsPerPage > 0
        ? portfolioRows
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : portfolioRows,
    [order, orderBy, page, portfolioRows, rowsPerPage]
  );

  const handleSelectAllClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(visibleRows);
        return;
      }
      setSelected([]);
    },
    [visibleRows]
  );

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PortfolioListTableToolBar selected={selected} />

      <TableContainer>
        <StyledTable aria-labelledby="tableTitle" size="medium">
          <PortfolioListTableHead
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={visibleRows.length}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
          />
          <PortfolioListTableBody
            numEmptyRows={numEmptyRows}
            visibleRows={visibleRows}
            selected={selected}
            updateSelected={updateSelected}
          />
        </StyledTable>
      </TableContainer>

      <TablePagination
        count={portfolioRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, { label: "All", value: -1 }]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

const StyledTable = styled(Table)`
  min-width: 750px;

  & .${tableRowClasses.root}:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
  }
`;

// Natural sorting algorithm to account for numbers in strings
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const getValue = (item: T) => {
    const value = item[orderBy];
    if (typeof value === "string") {
      // Split the string into parts of digits and non-digits
      const parsedValue: (string | number)[] = value
        .split(/(\d+)/)
        .map((part) =>
          isNaN(Number(part)) ? part.toLowerCase() : Number(part)
        );
      return parsedValue;
    }
    return [value]; // Return a single-element array for non-string values
  };

  const valueA = getValue(a);
  const valueB = getValue(b);

  let comparison = 0;
  for (let i = 0; i < Math.min(valueA.length, valueB.length); i++) {
    if (valueB[i] < valueA[i]) {
      // Sort valueA before valueB
      comparison = -1;
      break;
    }
    if (valueB[i] > valueA[i]) {
      // Sort valueB before valueA
      comparison = 1;
      break;
    }
  }

  return comparison;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
