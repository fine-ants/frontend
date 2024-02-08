import { StockTargetPrice } from "@api/notifications/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import StockNotificationLotRow from "./StockNotificationLotRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly (StockTargetPrice & {
    companyName: string;
    tickerSymbol: string;
  })[];
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
          <TableCell colSpan={5} />
        </TableRow>
      )}
    </TableBody>
  );
}
