import { TableBody, TableCell, TableRow } from "@mui/material";
import { StockTargetPrice } from "../StockNotificationListTable";
import StockNotificationLotRow from "./StockNotificationLotRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly StockTargetPrice[];
};

export default function StockNotificationLotsTableBody({
  numEmptyRows,
  visibleRows,
}: Props) {
  return (
    <TableBody>
      {visibleRows.map((row) => (
        <StockNotificationLotRow key={row.notificationId} row={row} />
      ))}
      {numEmptyRows > 0 && (
        <TableRow
          style={{
            height: 48 * numEmptyRows,
          }}>
          <TableCell colSpan={4} />
        </TableRow>
      )}
    </TableBody>
  );
}
