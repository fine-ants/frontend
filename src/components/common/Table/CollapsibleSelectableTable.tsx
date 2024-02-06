import {
  Box as MuiBox,
  Table as MuiTable,
  TableBodyProps as MuiTableBodyProps,
  TableContainer as MuiTableContainer,
  TableHeadProps as MuiTableHeadProps,
  ToolbarProps as MuiToolbarProps,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import TablePagination from "../Pagination/TablePagination";
import { Order } from "./types";
import { getComparator } from "./utils";

type Props<Item> = {
  tableTitle: string;
  initialOrderBy: keyof Item;
  rowsPerPageOptions?: number[];
  data: Item[];
  TableToolBar?: (
    props: MuiToolbarProps & { selected: readonly Item[] }
  ) => JSX.Element;
  TableHead: (
    props: MuiTableHeadProps & {
      order: Order;
      orderBy: keyof Item;
      numSelected: number;
      rowCount: number;
      onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
      onRequestSort: (event: MouseEvent<unknown>, property: keyof Item) => void;
      isAllRowsOpen: boolean;
      onExpandOrCollapseAllRows: (event: MouseEvent) => void;
    }
  ) => JSX.Element;
  TableBody: (
    props: MuiTableBodyProps & {
      numEmptyRows: number;
      visibleRows: readonly Item[];
      selected: readonly Item[];
      updateSelected: (newSelected: readonly Item[]) => void;
      isAllRowsOpen: boolean;
    }
  ) => JSX.Element;
  EmptyTable: () => JSX.Element;
  enableTablePagination?: boolean;
};

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

export default function CollapsibleSelectableTable<Item>({
  tableTitle,
  initialOrderBy,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  data: tableRows,
  TableToolBar,
  TableHead,
  TableBody,
  EmptyTable,
  enableTablePagination = true,
}: Props<Item>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Item>(initialOrderBy);
  const [selected, setSelected] = useState<readonly Item[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPageOptions[0]);
  const [isAllRowsOpen, setIsAllRowsOpen] = useState(false);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof Item) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const updateSelected = (newSelected: readonly Item[]) => {
    setSelected(newSelected);
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

  const handleChangeRowsPerPage = (newValue: string) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  const handleExpandOrCollapseAllRows = () => {
    setIsAllRowsOpen(!isAllRowsOpen);
  };

  return (
    <MuiBox sx={{ width: "100%" }}>
      {tableRows.length > 0 ? (
        <>
          {TableToolBar && <TableToolBar selected={selected} />}

          <MuiTableContainer>
            <MuiTable
              aria-labelledby={tableTitle}
              aria-label="collapsible table"
              size="medium">
              <TableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={visibleRows.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                isAllRowsOpen={isAllRowsOpen}
                onExpandOrCollapseAllRows={handleExpandOrCollapseAllRows}
              />
              <TableBody
                numEmptyRows={numEmptyRows}
                visibleRows={visibleRows}
                selected={selected}
                updateSelected={updateSelected}
                isAllRowsOpen={isAllRowsOpen}
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
