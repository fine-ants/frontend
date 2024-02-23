import { WatchlistItemType } from "@api/watchlist";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { MouseEvent } from "react";
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
  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedItem = selected.find((item) => item.id === id);
    const selectedItemIndex = selectedItem
      ? selected.indexOf(selectedItem)
      : -1;

    let newSelected: readonly WatchlistItemType[] = [];

    if (selectedItemIndex === -1) {
      // 선택이 되어있지 않은 경우, 해당 아이템을 선택 및 추가
      const targetItem = visibleRows.find((item) => item.id === id);
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

  const isSelected = (id: number) => !!selected.find((item) => item.id === id);

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <WatchlistTableRow
            key={row.id}
            isItemSelected={isItemSelected}
            handleClick={handleClick}
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
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBody>
  );
}
