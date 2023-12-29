import dividerIcon from "@assets/icons/ic_divider.svg";
import {
  TablePagination as MuiTablePagination,
  tablePaginationClasses,
} from "@mui/material";
import styled from "styled-components";
import { Select, SelectOption } from "../Select";
import Pagination from "./Pagination";
import calculateStartAndEndRows from "./utils/calculateStartAndEndRows";

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (value: string) => void;
};

export default function TablePagination({
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
        <>
          <StyledLabelRowsPerPage>
            전체 <span>{count}</span> 중{" "}
            <span>
              {startRow && endRow
                ? endRow === 1
                  ? 1
                  : `${startRow}-${endRow}`
                : count}
            </span>
          </StyledLabelRowsPerPage>
          <img src={dividerIcon} alt="" />
        </>
      }
      labelDisplayedRows={() => (rowsPerPage === -1 ? "" : "개 씩 보기")}
      slotProps={{
        select: {
          input: (
            <Select
              size="h24"
              selectedValue={rowsPerPage.toString()}
              changeSelectedValue={onRowsPerPageChange}>
              {rowsPerPageOptions.map((option) => (
                <SelectOption key={option} value={option.toString()}>
                  {option}
                </SelectOption>
              ))}
            </Select>
          ),
        },
      }}
      ActionsComponent={() => (
        <Pagination
          count={Math.floor(count / rowsPerPage)}
          page={page + 1}
          onPageChange={onPageChange}
        />
      )}
      onPageChange={onPageChange}
    />
  );
}

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
    border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
    border-radius: 2px;
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray900};

    &:hover {
      border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
    }

    &:active {
      border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
    }
  }

  & .${tablePaginationClasses.displayedRows} {
    margin: 0 auto 0 8px;
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray600};
  }
`;

const StyledLabelRowsPerPage = styled.span`
  margin-right: 8px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray600};

  > span {
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
