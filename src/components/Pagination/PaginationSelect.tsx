import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { Select, SelectOption } from "../Select";

type Props = {
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (value: string) => void;
};

export function PaginationSelect({
  rowsPerPage,
  rowsPerPageOptions,
  onRowsPerPageChange,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <Select
      size={isMobile ? "h32" : "h24"}
      menuMinHeight="auto"
      selectedValue={rowsPerPage.toString()}
      changeSelectedValue={onRowsPerPageChange}>
      {rowsPerPageOptions.map((option) => (
        <SelectOption key={option} value={option.toString()}>
          {option === -1 ? "All" : option}
        </SelectOption>
      ))}
    </Select>
  );
}
