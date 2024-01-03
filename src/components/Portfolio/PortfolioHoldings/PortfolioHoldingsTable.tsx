import { PortfolioHolding } from "@api/portfolio/types";
import TablePagination from "@components/common/Pagination/TablePagination";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import designSystem from "@styles/designSystem";
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
  selected: readonly number[];
  onClickCheckbox: (selected: readonly number[]) => void;
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
      const newSelected = portfolioRows.map((n) => n.portfolioHoldingId);
      onClickCheckbox(newSelected);
      return;
    }
    onClickCheckbox([]);
  };

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
    onClickCheckbox(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: string) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const numEmptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - portfolioRows.length) : 0;

  const visibleRows = useMemo(
    () =>
      portfolioRows
        .slice(
          page * rowsPerPage,
          page * rowsPerPage +
            (rowsPerPage === -1 ? portfolioRows.length : rowsPerPage)
        )
        .sort(getComparator(order, orderBy)),
    [order, orderBy, page, portfolioRows, rowsPerPage]
  );

  return (
    <StyledPortfolioHoldingsTable>
      <ThemeProvider theme={muiTheme}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <PortfolioHoldingsTableHead
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              rowCount={portfolioRows.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />

            <TableBody style={{ width: "896px", marginTop: "8px" }}>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.portfolioHoldingId);
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
          </Table>
        </TableContainer>
      </ThemeProvider>

      <TablePagination
        count={portfolioRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, -1]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledPortfolioHoldingsTable>
  );
}

const StyledPortfolioHoldingsTable = styled(Box)`
  width: 896px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;

const muiTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "127px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "10px",
          height: "12px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "100%",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0",
          margin: "0",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          width: "32px",
          height: "100%",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: "87px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "0 8px",
          justifyContent: "center",
          width: "127px",
          height: "24px",
          font: designSystem.font.body3,
          backgroundColor: designSystem.color.neutral.white,
          textAlign: "left",
        },
        input: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0",
        },
        input: {
          width: "87px",
          padding: "0 0 0 0",
          font: designSystem.font.body3,
        },
      },
    },
  },
});
