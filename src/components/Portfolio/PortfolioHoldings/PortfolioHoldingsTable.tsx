import { PortfolioHolding } from "@api/portfolio/types";
import TablePagination from "@components/common/Pagination/TablePagination";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import styled from "styled-components";
import PortfolioHoldingsTableHead from "./PorfolioHoldingTableHead";
import PortfolioHoldingRow from "./PortfolioHoldingRow";

export type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof PortfolioHolding>(
  order: Order,
  orderBy: Key
): (a: PortfolioHolding, b: PortfolioHolding) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type Props = {
  selected: readonly string[];
  onClickCheckbox: (selected: readonly string[]) => void;
  portfolioId: number;
  data: PortfolioHolding[];
};

export default function PortfolioHoldingsTable({
  selected,
  onClickCheckbox,
  portfolioId,
  data,
}: Props) {
  const portfolioRows = data;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof PortfolioHolding>("dateCreated");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof PortfolioHolding
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = portfolioRows.map((n) => n.tickerSymbol);
      onClickCheckbox(newSelected);
      return;
    }
    onClickCheckbox([]);
  };

  const handleClick = (_: MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    onClickCheckbox(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const numEmptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - portfolioRows.length) : 0;

  const visibleRows = useMemo(
    () =>
      portfolioRows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy)),
    [order, orderBy, page, portfolioRows, rowsPerPage]
  );

  return (
    <StyledPortfolioHoldingsTable aria-label="collapsible table">
      <PortfolioHoldingsTableHead
        order={order}
        orderBy={orderBy}
        numSelected={selected.length}
        rowCount={portfolioRows.length}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
      />
      <TableBody style={{ width: "896px" }}>
        {visibleRows.map((row, index) => {
          const isItemSelected = isSelected(row.tickerSymbol);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <PortfolioHoldingRow
              key={row.tickerSymbol}
              isItemSelected={isItemSelected}
              handleClick={handleClick}
              labelId={labelId}
              row={row}
              portfolioId={portfolioId}
            />
          );
        })}
        {numEmptyRows > 0 && (
          <TableRow
            style={{
              width: 896,
              height: 48 * numEmptyRows,
            }}>
            <TableCell colSpan={10} style={{ padding: 0 }} />
          </TableRow>
        )}
      </TableBody>

      <TablePagination
        count={portfolioRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, { label: "All", value: -1 }]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledPortfolioHoldingsTable>
  );
}

const StyledPortfolioHoldingsTable = styled(Table)`
  display: flex;
  flex-direction: column;
  width: 896px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;
