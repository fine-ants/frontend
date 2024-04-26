export default function calculateStartAndEndRows(
  totalNumRows: number,
  currentPage: number,
  rowsPerPage: number
) {
  if (currentPage < 1 || rowsPerPage < 1 || totalNumRows < 0) return {};

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalNumRows);

  // If the page number exceeds the available rows.
  // Ex: totalNumRows = 100, currentPage = 11, rowsPerPage = 10
  if (startRow > totalNumRows) return {};

  return { startRow, endRow };
}
