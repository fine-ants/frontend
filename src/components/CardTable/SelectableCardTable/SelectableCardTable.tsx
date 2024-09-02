import Pagination from "@components/Pagination/Pagination";
import { PaginationControl } from "@components/Pagination/PaginationControl";
import calculateStartAndEndRows from "@components/Pagination/utils/calculateStartAndEndRows";
import { Order } from "@components/Table/types";
import { getComparator } from "@components/Table/utils/comparator";
import { useBoolean } from "@fineants/demolition";
import {
  ChangeEvent,
  ComponentType,
  useCallback,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { OrderByDrawer } from "../OrderByDrawer/OrderByDrawer";

type Props<Item> = {
  data: Item[];
  initialOrderBy: keyof Item;
  orderByList: {
    title: string;
    orderBy: keyof Item;
  }[];
  CardBody: ComponentType<{
    visibleRows: Item[];
    selected: readonly Item[];
    isAllRowsSelectedInCurrentPage: boolean;
    updateSelected: (newSelected: readonly Item[]) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  }>;
  CardTableToolbar: ComponentType<{
    selected: readonly Item[];
    isAllRowsSelectedInCurrentPage: boolean;
    openDrawer: () => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    clearSelected: () => void;
  }>;
  EmptyComponent?: ComponentType;
};

const defaultRowsPerPageOptions = [5, 10, 15, 20, -1];

export default function SelectableCardTable<Item extends { id: number }>({
  data,
  initialOrderBy,
  orderByList,
  CardBody,
  CardTableToolbar,
  EmptyComponent = () => <></>,
}: Props<Item>) {
  const count = data.length;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Item>(initialOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPageOptions[0]);
  const [selected, setSelected] = useState<readonly Item[]>([]);

  const {
    state: isDrawerOpen,
    setTrue: openDrawer,
    setFalse: closeDrawer,
  } = useBoolean();

  const { startRow, endRow } = calculateStartAndEndRows(
    count,
    page + 1,
    rowsPerPage
  );

  const visibleRows = useMemo(
    () =>
      rowsPerPage > 0 || rowsPerPage === -1
        ? data
            .sort(getComparator(order, orderBy))
            .slice(
              page * rowsPerPage,
              page * rowsPerPage +
                (rowsPerPage === -1 ? data.length : rowsPerPage)
            )
        : data,
    [order, orderBy, page, rowsPerPage, data]
  );

  const applyOrderOption = (order: Order, orderBy: keyof Item) => {
    setOrder(order);
    setOrderBy(orderBy);
  };

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

  const clearSelected = () => {
    setSelected([]);
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

  const selectedSet = new Set(selected.map((item) => item.id));
  const isAllRowsSelectedInCurrentPage =
    selected.length > 0 &&
    visibleRows.every((visibleRow) => selectedSet.has(visibleRow.id));

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
            clearSelected={clearSelected}
            onSelectAllClick={handleSelectAllClick}
            openDrawer={openDrawer}
          />

          <CardBody
            visibleRows={visibleRows}
            selected={selected}
            isAllRowsSelectedInCurrentPage={isAllRowsSelectedInCurrentPage}
            updateSelected={updateSelected}
            onSelectAllClick={handleSelectAllClick}
          />

          <PaginationWrapper>
            <Pagination
              count={Math.ceil(count / rowsPerPage)}
              page={page + 1}
              onPageChange={handleChangePage}
            />
          </PaginationWrapper>

          <OrderByDrawer
            isDrawerOpen={isDrawerOpen}
            order={order}
            orderBy={orderBy}
            orderByList={orderByList}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
            applyOrderOption={applyOrderOption}
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

const PaginationWrapper = styled.div`
  margin-top: auto;
`;
