import { useBoolean } from "@fineants/demolition";
import {
  Box as MuiBox,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
} from "@mui/material";
import {
  ChangeEvent,
  ComponentType,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TablePagination from "../Pagination/TablePagination";
import { Order } from "./types";
import { getComparator } from "./utils/comparator";

type Props<Item> = {
  tableTitle: string;
  initialOrderBy: keyof Item;
  rowsPerPageOptions?: number[];
  data: Item[];
  TableToolBar: ComponentType<{
    selected: readonly Item[];
    updateSelected: (newSelected: readonly Item[]) => void;
    isAllDeleteOnLastPage: boolean;
    moveToPrevTablePage: () => void;
  }>;
  TableHead: ComponentType<{
    order: Order;
    orderBy: keyof Item;
    isAllRowsSelectedInCurrentPage: boolean;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Item) => void;
    isAllRowsOpen: boolean;
    onExpandOrCollapseAllRows: (event: MouseEvent) => void;
  }>;
  TableBody: ComponentType<{
    numEmptyRows: number;
    visibleRows: readonly Item[];
    selected: readonly Item[];
    updateSelected: (newSelected: readonly Item[]) => void;
    isAllRowsOpen: boolean;
  }>;
  EmptyTable?: ComponentType;
  enableTablePagination?: boolean;
};

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

export default function CollapsibleSelectableTable<
  Item extends { id: string | number },
>({
  tableTitle,
  initialOrderBy,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  data: tableRows,
  TableToolBar,
  TableHead,
  TableBody,
  EmptyTable = () => <></>,
  enableTablePagination = true,
}: Props<Item>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Item>(initialOrderBy);
  const [selected, setSelected] = useState<readonly Item[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { state: isAllRowsOpen, setOpposite: handleExpandOrCollapseAllRows } =
    useBoolean();

  const handleRequestSort = useCallback(
    (_: MouseEvent<unknown>, property: keyof Item) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    []
  );

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const moveToPrevTablePage = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const updateSelected = useCallback((newSelected: readonly Item[]) => {
    setSelected(newSelected);
  }, []);

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

  // TODO : 다른 Table component도 고려
  const visibleRowsRef = useRef(visibleRows);

  useEffect(() => {
    visibleRowsRef.current = visibleRows;
  }, [visibleRows]);

  const handleSelectAllClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(visibleRowsRef.current);
      } else {
        setSelected([]);
      }
    },
    []
  );

  const handleChangeRowsPerPage = useCallback((newValue: string) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  }, []);

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
              isAllDeleteOnLastPage={isAllDeleteOnLastPage}
              updateSelected={updateSelected}
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
                isAllRowsOpen={isAllRowsOpen}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                onExpandOrCollapseAllRows={handleExpandOrCollapseAllRows}
              />
              <TableBody
                numEmptyRows={numEmptyRows}
                visibleRows={visibleRows}
                selected={selected}
                isAllRowsOpen={isAllRowsOpen}
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
