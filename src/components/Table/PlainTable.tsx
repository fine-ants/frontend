import {
  Box as MuiBox,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
} from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import TablePagination from "../Pagination/TablePagination";
import { Order } from "./types";
import { getComparator } from "./utils/comparator";

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

type Props<Item> = {
  tableTitle: string;
  initialOrderBy: keyof Item;
  rowsPerPageOptions?: number[];
  data: Item[];
  TableHead: (props: {
    order: Order;
    orderBy: keyof Item;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Item) => void;
  }) => JSX.Element;
  TableBody: (props: {
    numEmptyRows: number;
    visibleRows: readonly Item[];
  }) => JSX.Element;
  EmptyTable?: () => JSX.Element;
  enableTablePagination?: boolean;
};

export default function PlainTable<Item>({
  tableTitle,
  initialOrderBy,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  data: tableRows,
  TableHead,
  TableBody,
  EmptyTable = () => <></>,
  enableTablePagination = true,
}: Props<Item>) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Item>(initialOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof Item) => {
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

  const numEmptyRows = enableTablePagination
    ? Math.max(0, (1 + page) * Math.min(5, rowsPerPage) - tableRows.length)
    : 0;

  const visibleRows = useMemo(
    () =>
      rowsPerPage > 0 || rowsPerPage === -1
        ? tableRows
            .sort(getComparator(order, orderBy))
            .slice(
              page * rowsPerPage,
              page * rowsPerPage +
                (rowsPerPage === -1 ? tableRows.length : rowsPerPage)
            )
        : tableRows,
    [order, orderBy, page, rowsPerPage, tableRows]
  );

  return (
    <MuiBox sx={{ width: "100%" }}>
      {tableRows.length > 0 ? (
        <>
          <MuiTableContainer>
            <MuiTable
              aria-labelledby={tableTitle}
              aria-label="table"
              size="medium">
              <TableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody
                numEmptyRows={numEmptyRows}
                visibleRows={visibleRows}
              />
            </MuiTable>
          </MuiTableContainer>

          {enableTablePagination && (
            <TablePagination
              count={tableRows.length}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </>
      ) : (
        <EmptyTable />
      )}
    </MuiBox>
  );
}
