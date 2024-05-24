import Pagination from "@components/Pagination/Pagination";
import { PaginationControl } from "@components/Pagination/PaginationControl";
import calculateStartAndEndRows from "@components/Pagination/utils/calculateStartAndEndRows";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

type Props<Item> = {
  data: Item[];
  CardBody: (props: {
    visibleRows: Item[];
    selected: readonly Item[];
    isAllRowsSelectedInCurrentPage: boolean;
    updateSelected: (newSelected: readonly Item[]) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => JSX.Element;
  CardTableToolbar: (props: {
    selected: readonly Item[];
    isAllRowsSelectedInCurrentPage: boolean;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => JSX.Element;
  EmptyComponent?: () => JSX.Element;
};

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

export function SelectableCardTable<Item>({
  data,
  CardBody,
  CardTableToolbar,
  EmptyComponent = () => <></>,
}: Props<Item>) {
  const count = data.length;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPageOptions[0]);
  const [selected, setSelected] = useState<readonly Item[]>([]);

  const { startRow, endRow } = calculateStartAndEndRows(
    count,
    page + 1,
    rowsPerPage
  );

  const visibleRows = useMemo(
    () =>
      rowsPerPage > 0 || rowsPerPage === -1
        ? data.slice(
            page * rowsPerPage,
            page * rowsPerPage +
              (rowsPerPage === -1 ? data.length : rowsPerPage)
          )
        : data,
    [page, rowsPerPage, data]
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newValue: string) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  const updateSelected = (newSelected: readonly Item[]) => {
    setSelected(newSelected);
  };

  const handleSelectAllClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected((prev) => {
          const set = new Set([...prev, ...visibleRows]);
          return [...set];
        });
        return;
      }
      setSelected((prev) => {
        const set = new Set(prev);
        visibleRows.forEach((visibleRow) => set.delete(visibleRow));
        return [...set];
      });
    },
    [visibleRows]
  );

  const selectedSet = new Set(selected);
  const isAllRowsSelectedInCurrentPage =
    selected.length > 0 &&
    visibleRows.every((visibleRow) => selectedSet.has(visibleRow));

  return (
    <>
      {data.length > 0 ? (
        <>
          <ControlWrapper>
            <PaginationControl
              count={count}
              startRow={startRow}
              endRow={endRow}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={defaultRowsPerPageOptions}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </ControlWrapper>

          <CardTableToolbar
            selected={selected}
            isAllRowsSelectedInCurrentPage={isAllRowsSelectedInCurrentPage}
            onSelectAllClick={handleSelectAllClick}
          />
          {/* TODO 정렬 기능 구현 */}
          <CardBody
            visibleRows={visibleRows}
            selected={selected}
            isAllRowsSelectedInCurrentPage={isAllRowsSelectedInCurrentPage}
            updateSelected={updateSelected}
            onSelectAllClick={handleSelectAllClick}
          />
          <Pagination
            count={Math.ceil(count / rowsPerPage)}
            page={page + 1}
            onPageChange={handleChangePage}
          />
        </>
      ) : (
        <EmptyComponent />
      )}
    </>
  );
}

const ControlWrapper = styled.div`
  padding: 0 16px;
`;
