import {
  Box as MuiBox,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import TablePagination from "../Pagination/TablePagination";
import { Order } from "./types";
import { getComparator } from "./utils/comparator";

type Props<Item> = {
  tableTitle: string;
  initialOrderBy: keyof Item;
  rowsPerPageOptions?: number[];
  data: Item[];
  TableToolBar: (props: {
    selected: readonly Item[];
    updateSelected: (newSelected: readonly Item[]) => void;
    isAllDeleteOnLastPage: boolean;
    moveToPrevTablePage: () => void;
  }) => JSX.Element;
  TableHead: (props: {
    order: Order;
    orderBy: keyof Item;
    isAllRowsSelectedInCurrentPage: boolean;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Item) => void;
  }) => JSX.Element;
  TableBody: (props: {
    numEmptyRows: number;
    visibleRows: readonly Item[];
    selected: readonly Item[];
    updateSelected: (newSelected: readonly Item[]) => void;
  }) => JSX.Element;
  EmptyTable?: () => JSX.Element;
};

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

export default function SelectableTable<Item extends { id: string | number }>({
  tableTitle,
  initialOrderBy,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  data: tableRows,
  TableToolBar,
  TableHead,
  TableBody,
  EmptyTable = () => <></>,
}: Props<Item>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Item>(initialOrderBy);
  const [selected, setSelected] = useState<readonly Item[]>([]);
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

  const moveToPrevTablePage = () => {
    setPage((prev) => prev - 1);
  };

  const updateSelected = (newSelected: readonly Item[]) => {
    setSelected(newSelected);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const numEmptyRows = Math.max(
    0,
    (1 + page) * Math.min(5, rowsPerPage) - tableRows.length
  );

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

  const handleSelectAllClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected((prev) => {
          const set = new Set([...prev, ...visibleRows]);
          return [...set];
        });
        return;
      }
      setSelected((prev) => {
        const set = new Set(prev);
        visibleRows.forEach((visibleRow) => set.delete(visibleRow));
        return [...set];
      });
    },
    [visibleRows]
  );

  const handleChangeRowsPerPage = (newValue: string) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  const selectedSet = new Set(selected.map((item) => item.id));
  const isAllRowsSelectedInCurrentPage =
    selected.length > 0 &&
    visibleRows.every((visibleRow) => selectedSet.has(visibleRow.id));
  const isAllDeleteOnLastPage =
    page >= Math.ceil(tableRows.length / rowsPerPage) - 1 &&
    isAllRowsSelectedInCurrentPage;

  return (
    <MuiBox sx={{ width: "100%" }}>
      {tableRows.length > 0 ? (
        <>
          {TableToolBar && (
            <TableToolBar
              selected={selected}
              updateSelected={updateSelected}
              isAllDeleteOnLastPage={isAllDeleteOnLastPage}
              moveToPrevTablePage={moveToPrevTablePage}
            />
          )}

          <MuiTableContainer>
            <MuiTable
              aria-labelledby={tableTitle}
              aria-label="collapsible table"
              size="medium">
              <TableHead
                order={order}
                orderBy={orderBy}
                isAllRowsSelectedInCurrentPage={isAllRowsSelectedInCurrentPage}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
              />
              <TableBody
                numEmptyRows={numEmptyRows}
                visibleRows={visibleRows}
                selected={selected}
                updateSelected={updateSelected}
              />
            </MuiTable>
          </MuiTableContainer>

          <TablePagination
            count={tableRows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <EmptyTable />
      )}
    </MuiBox>
  );
}
