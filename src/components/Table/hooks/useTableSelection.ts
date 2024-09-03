import { MouseEvent, useCallback } from "react";

type UseTableSelectionProps<T> = {
  selected: readonly T[];
  updateSelected: (selected: readonly T[]) => void;
};

export function useTableSelection<T extends { id: number }>({
  selected,
  updateSelected,
}: UseTableSelectionProps<T>) {
  const toggleSelect = useCallback(
    (_: MouseEvent<unknown>, row: T) => {
      const selectedItemIndex = selected.findIndex(
        (item) => item.id === row.id
      );
      let newSelected: readonly T[] = [];

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

  return { toggleSelect, isSelected };
}
