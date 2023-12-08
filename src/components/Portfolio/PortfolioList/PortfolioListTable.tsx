import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import { PortfolioItem } from "@api/portfolio/types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  tableRowClasses,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import styled from "styled-components";
import PortfolioListTableHead from "./PortfolioListTableHead";
import PortfolioListTableRow from "./PortfolioListTableRow";
import PortfolioListTableToolBar from "./PortfolioListTableToolBar";

export type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
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

export default function PortfolioListTable() {
  const { data: portfolioItems } = usePortfolioListQuery();

  const portfolioRows = portfolioItems.portfolios;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof PortfolioItem>("dateCreated");
  const [selected, setSelected] = useState<readonly number[]>([]);
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

  // TODO: select all in current page only
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = portfolioRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // TODO: if click on name, navigate to portfolio page (don't select).
  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

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
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

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
    <Box sx={{ width: "100%" }}>
      <PortfolioListTableToolBar numSelected={selected.length} />

      <TableContainer>
        <StyledTable aria-labelledby="tableTitle" size="medium">
          <PortfolioListTableHead
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={portfolioRows.length}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <PortfolioListTableRow
                  {...{
                    key: row.id,
                    isItemSelected,
                    handleClick,
                    labelId,
                    row,
                  }}
                />
              );
            })}
            {numEmptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * numEmptyRows,
                }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={portfolioRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
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
