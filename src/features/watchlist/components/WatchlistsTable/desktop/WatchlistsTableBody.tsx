import { useTableSelection } from "@components/Table/hooks/useTableSelection";
import { WatchlistsType } from "@features/watchlist/api";
import { TableBody, TableCell, TableRow } from "@mui/material";
import WatchlistsTableRow from "./WatchlistsTableRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly WatchlistsType[];
  selected: readonly WatchlistsType[];
  updateSelected: (selected: readonly WatchlistsType[]) => void;
};

export default function WatchlistsTableBody({
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
          <WatchlistsTableRow
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
          <TableCell colSpan={8} />
        </TableRow>
      )}
    </TableBody>
  );
}
