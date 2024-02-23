import { PortfolioHolding } from "@api/portfolio/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { MouseEvent } from "react";
import PortfolioHoldingRow from "./PortfolioHoldingRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly PortfolioHolding[];
  selected: readonly PortfolioHolding[];
  updateSelected: (selected: readonly PortfolioHolding[]) => void;
  isAllRowsOpen: boolean;
};

export default function PortfolioHoldingTableBody({
  numEmptyRows,
  visibleRows,
  selected,
  updateSelected,
  isAllRowsOpen,
}: Props) {
  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedItem = selected.find(
      (item) => item.portfolioHoldingId === id
    );
    const selectedItemIndex = selectedItem
      ? selected.indexOf(selectedItem)
      : -1;

    let newSelected: readonly PortfolioHolding[] = [];

    if (selectedItemIndex === -1) {
      // 선택이 되어있지 않은 경우, 해당 아이템을 선택 및 추가
      const targetItem = visibleRows.find(
        (item) => item.portfolioHoldingId === id
      );
      newSelected = newSelected.concat(selected, targetItem ?? []);
    } else if (selectedItemIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedItemIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedItemIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedItemIndex),
        selected.slice(selectedItemIndex + 1)
      );
    }
    updateSelected(newSelected);
  };

  const isSelected = (id: number) =>
    !!selected.find((item) => item.portfolioHoldingId === id);

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.portfolioHoldingId);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <PortfolioHoldingRow
            key={row.portfolioHoldingId}
            labelId={labelId}
            row={row}
            isItemSelected={isItemSelected}
            isAllRowsOpen={isAllRowsOpen}
            handleClick={handleClick}
          />
        );
      })}
      {numEmptyRows > 0 && (
        <TableRow
          style={{
            height: 48 * numEmptyRows,
          }}>
          <TableCell colSpan={10} />
        </TableRow>
      )}
    </TableBody>
  );
}
