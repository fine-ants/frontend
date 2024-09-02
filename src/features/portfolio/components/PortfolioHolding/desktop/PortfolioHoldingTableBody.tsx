import { PortfolioHolding } from "@features/portfolio/api/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { MouseEvent, memo, useCallback } from "react";
import PortfolioHoldingRow from "./PortfolioHoldingRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly PortfolioHolding[];
  selected: readonly PortfolioHolding[];
  isAllRowsOpen: boolean;
  updateSelected: (selected: readonly PortfolioHolding[]) => void;
};

export default memo(function PortfolioHoldingTableBody({
  numEmptyRows,
  visibleRows,
  selected,
  isAllRowsOpen,
  updateSelected,
}: Props) {
  // TODO 다른 TableBody도 다음과같이 수정하기
  const handleClick = useCallback(
    (_: MouseEvent<unknown>, row: PortfolioHolding) => {
      const selectedItemIndex = selected.findIndex(
        (item) => item.id === row.id
      );
      let newSelected: readonly PortfolioHolding[] = [];

      if (selectedItemIndex === -1) {
        newSelected = [...selected, row];
      } else {
        newSelected = selected.filter(
          (_, index) => index !== selectedItemIndex
        );
      }

      updateSelected(newSelected);
    },
    [selected, updateSelected]
  );

  const isSelected = useCallback(
    (id: number) => !!selected.find((item) => item.id === id),
    [selected]
  );

  return (
    <TableBody>
      <TableRow style={{ height: 8 }}>
        <TableCell colSpan={10} sx={{ padding: "0", border: "none" }} />
      </TableRow>

      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <PortfolioHoldingRow
            key={row.id}
            labelId={labelId}
            isItemSelected={isItemSelected}
            isAllRowsOpen={isAllRowsOpen}
            handleClick={handleClick}
            {...row}
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
});
