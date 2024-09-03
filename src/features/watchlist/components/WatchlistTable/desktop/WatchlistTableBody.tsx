import { useTableSelection } from "@components/Table/hooks/useTableSelection";
import { WatchlistItemType } from "@features/watchlist/api";
import { TableBody, TableCell, TableRow } from "@mui/material";
import WatchlistTableRow from "./WatchlistTableRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly WatchlistItemType[];
  selected: readonly WatchlistItemType[];
  updateSelected: (selected: readonly WatchlistItemType[]) => void;
};

export default function WatchlistTableBody({
  numEmptyRows,
  visibleRows,
  selected,
  updateSelected,
}: Props) {
  const { isSelected, toggleSelect } = useTableSelection({
    selected,
    updateSelected,
  });

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <WatchlistTableRow
            key={row.id}
            isItemSelected={isItemSelected}
            toggleSelect={toggleSelect}
            labelId={labelId}
            row={row}
          />
        );
      })}
      {numEmptyRows > 0 && (
        <TableRow
          style={{
            height: 64 * numEmptyRows,
          }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
