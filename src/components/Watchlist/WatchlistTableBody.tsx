import { WatchlistItemType } from "@api/watchlist";
import { TableBody, TableCell, TableRow } from "@mui/material";
import WatchlistTableRow from "./WatchlistTableRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly WatchlistItemType[];
};

export default function WatchlistTableBody({
  numEmptyRows,
  visibleRows,
}: Props) {
  return (
    <TableBody>
      {visibleRows.map((row) => {
        return <WatchlistTableRow key={row.id} row={row} />;
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
