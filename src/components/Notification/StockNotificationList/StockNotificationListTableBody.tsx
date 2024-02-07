import { StockNotification } from "@api/notifications/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import StockNotificationRow from "./StockNotificationRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly StockNotification[];
  isAllRowsOpen: boolean;
};

export default function StockNotificationListTableBody({
  numEmptyRows,
  visibleRows,
  isAllRowsOpen,
}: Props) {
  return (
    <TableBody>
      {visibleRows.map((row) => (
        <StockNotificationRow
          key={row.companyName}
          row={row}
          isAllRowsOpen={isAllRowsOpen}
        />
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
