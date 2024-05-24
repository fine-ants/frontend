import { PortfolioNotification } from "@features/notification/api/types";
import { TableBody, TableCell, TableRow } from "@mui/material";
import PortfolioNotificationRow from "./PortfolioNotificationRow";

type Props = {
  numEmptyRows: number;
  visibleRows: readonly PortfolioNotification[];
};

export default function PortfolioNotificationListTableBody({
  numEmptyRows,
  visibleRows,
}: Props) {
  return (
    <TableBody>
      {visibleRows.map((row) => (
        <PortfolioNotificationRow key={row.portfolioId} row={row} />
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
