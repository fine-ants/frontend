import { WatchlistItemType } from "@api/watchlist";
import useWatchlistQuery from "@api/watchlist/queries/useWatchlistQuery";
import TablePagination from "@components/common/Pagination/TablePagination";
import { Box, Table, TableContainer, tableRowClasses } from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import styled from "styled-components";
import EmptyWatchlistTable from "./EmptyWatchlistTable";
import WatchlistTableBody from "./WatchlistTableBody";
import WatchlistTableHead from "./WatchlistTableHead";
import WatchlistTableToolBar from "./WatchlistTableToolBar";

export type Order = "asc" | "desc";

export default function WatchlistTable() {
  const { data: watchlistData } = useWatchlistQuery();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof WatchlistItemType>("dateAdded");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof WatchlistItemType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newValue: string) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const numEmptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - watchlistData.length) : 0;

  const visibleRows = useMemo(
    () =>
      rowsPerPage > 0
        ? watchlistData
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : watchlistData,
    [order, orderBy, page, watchlistData, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      {watchlistData.length > 0 ? (
        <>
          <WatchlistTableToolBar />

          <TableContainer>
            <StyledTable aria-labelledby="tableTitle" size="medium">
              <WatchlistTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <WatchlistTableBody
                numEmptyRows={numEmptyRows}
                visibleRows={visibleRows}
              />
            </StyledTable>
          </TableContainer>

          <TablePagination
            count={watchlistData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 20, -1]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <EmptyWatchlistTable />
      )}
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
