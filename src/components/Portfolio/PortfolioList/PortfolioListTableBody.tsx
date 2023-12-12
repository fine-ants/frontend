import { PortfolioItem } from "@api/portfolio/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { MouseEvent } from "react";
import PortfolioListTableRow from "./PortfolioListTableRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly PortfolioItem[];
  selected: readonly number[];
  updateSelected: (selected: readonly number[]) => void;
};

export default function PortfolioListTableBody({
  numEmptyRows,
  visibleRows,
  selected,
  updateSelected,
}: Props) {
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
    updateSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <PortfolioListTableRow
            key={row.id}
            isItemSelected={isItemSelected}
            handleClick={handleClick}
            labelId={labelId}
            row={row}
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
  );
}
