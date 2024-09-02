import { useTableSelection } from "@components/Table/hooks/useTableSelection";
import { PortfolioHolding } from "@features/portfolio/api/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
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
  const { isSelected, toggleSelect } = useTableSelection({
    selected,
    updateSelected,
  });

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
            toggleSelect={toggleSelect}
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
