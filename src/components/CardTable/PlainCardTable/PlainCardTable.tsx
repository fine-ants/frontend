import Pagination from "@components/Pagination/Pagination";
import { PaginationControl } from "@components/Pagination/PaginationControl";
import calculateStartAndEndRows from "@components/Pagination/utils/calculateStartAndEndRows";
import { ComponentType, useMemo, useState } from "react";
import styled from "styled-components";

type Props<Item> = {
  data: Item[];
  CardBody: ComponentType<{ visibleRows: Item[] }>;
  EmptyComponent?: ComponentType;
};

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

export function PlainCardTable<Item>({
  data,
  CardBody,
  EmptyComponent = () => <></>,
}: Props<Item>) {
  const count = data.length;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPageOptions[0]);

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

          <CardBody visibleRows={visibleRows} />

          <PaginationWrapper>
            <Pagination
              count={Math.ceil(count / rowsPerPage)}
              page={page + 1}
              onPageChange={handleChangePage}
            />
          </PaginationWrapper>
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

const PaginationWrapper = styled.div`
  margin-top: auto;
`;
