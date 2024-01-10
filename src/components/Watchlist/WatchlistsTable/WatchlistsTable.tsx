import { WatchlistsType } from "@api/watchlist";
import useWatchlistsQuery from "@api/watchlist/queries/useWatchlistsQuery";
import TablePagination from "@components/common/Pagination/TablePagination";
import { Box, Table, TableContainer, tableRowClasses } from "@mui/material";
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import EmptyWatchlistsTable from "./EmptyWatchlistsTable";
import WatchlistsTableBody from "./WatchlistsTableBody";
import WatchlistsTableHead from "./WatchlistsTableHead";
import WatchlistTableToolBar from "./WatchlistsTableToolBar";

export type Order = "asc" | "desc";

export default function WatchlistsTable() {
  const { data: watchlistsData } = useWatchlistsQuery();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof WatchlistsType>("id");
  const [selected, setSelected] = useState<readonly WatchlistsType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof WatchlistsType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const updateSelected = (newSelected: readonly WatchlistsType[]) => {
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (newValue: string) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const numEmptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - watchlistsData.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      rowsPerPage > 0 || rowsPerPage === -1
        ? watchlistsData
            .sort(getComparator(order, orderBy))
            .slice(
              page * rowsPerPage,
              page * rowsPerPage +
                (rowsPerPage === -1 ? watchlistsData.length : rowsPerPage)
            )
        : watchlistsData,
    [order, orderBy, page, watchlistsData, rowsPerPage]
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

  return (
    <>
      {watchlistsData.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <WatchlistTableToolBar selected={selected} />

          <TableContainer>
            <StyledTable aria-labelledby="tableTitle" size="medium">
              <WatchlistsTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={visibleRows.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
              />
              <WatchlistsTableBody
                numEmptyRows={numEmptyRows}
                visibleRows={visibleRows}
                selected={selected}
                updateSelected={updateSelected}
              />
            </StyledTable>
          </TableContainer>

          <TablePagination
            count={watchlistsData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 20, -1]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        <EmptyWatchlistsTable />
      )}
    </>
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
