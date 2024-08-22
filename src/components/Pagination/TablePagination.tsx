import {
  TablePagination as MuiTablePagination,
  tablePaginationClasses,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { memo } from "react";
import styled from "styled-components";
import { LabelRowsPerPage } from "./LabelRowsPerPage";
import Pagination from "./Pagination";
import { PaginationSelect } from "./PaginationSelect";
import calculateStartAndEndRows from "./utils/calculateStartAndEndRows";

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (value: string) => void;
};

export default memo(function TablePagination({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const { startRow, endRow } = calculateStartAndEndRows(
    count,
    page + 1,
    rowsPerPage
  );

  return (
    <StyledTablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage={
        <LabelRowsPerPage count={count} startRow={startRow} endRow={endRow} />
      }
      labelDisplayedRows={() => (rowsPerPage === -1 ? "" : "개 씩 보기")}
      slotProps={{
        select: {
          input: (
            <PaginationSelect
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          ),
        },
      }}
      ActionsComponent={() => (
        <Pagination
          count={Math.ceil(count / rowsPerPage)}
          page={page + 1}
          onPageChange={onPageChange}
        />
      )}
      onPageChange={onPageChange}
    />
  );
});

const StyledTablePagination = styled(MuiTablePagination)`
  margin-top: 16px;
  height: 24px;

  & .${tablePaginationClasses.spacer} {
    display: none;
  }

  & .${tablePaginationClasses.toolbar} {
    height: 100%;
    min-height: auto;
    padding: 0;
    display: flex;
    background-color: #fff;
  }

  & .${tablePaginationClasses.input} {
    width: 49px;
    height: 24px;
    min-height: 24px;
    margin: 0;
  }

  & .${tablePaginationClasses.selectLabel} {
    margin-right: 8px;
  }

  & .${tablePaginationClasses.select} {
    width: 100%;
    height: inherit;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 1px solid ${designSystem.color.neutral.gray200};
    border-radius: 2px;
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray900};

    &:hover {
      border: 1px solid ${designSystem.color.primary.blue500};
    }

    &:active {
      border: 1px solid ${designSystem.color.primary.blue500};
    }
  }

  & .${tablePaginationClasses.displayedRows} {
    margin: 0 auto 0 8px;
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray600};
  }
`;
