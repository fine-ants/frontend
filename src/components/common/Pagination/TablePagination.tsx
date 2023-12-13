import chevronDownIcon from "@assets/icons/ic_chevron-down.svg";
import chevronUpIcon from "@assets/icons/ic_chevron-up.svg";
import dividerIcon from "@assets/icons/ic_divider.svg";
import {
  TablePagination as MuiTablePagination,
  tablePaginationClasses,
} from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import calculateStartAndEndRows from "./utils/calculateStartAndEndRows";

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: (
    | number
    | {
        label: string;
        value: number;
      }
  )[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
};

export default function TablePagination({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const [selectOpen, setSelectOpen] = useState(false);

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
      // TODO: rowPerPageOptions select dropdown 컴포넌트 customize 및 분리
      rowsPerPageOptions={rowsPerPageOptions}
      labelRowsPerPage={
        <>
          <StyledLabelRowsPerPage>
            전체 <span>{count}</span> 중{" "}
            <span>{startRow && endRow ? `${startRow}-${endRow}` : count}</span>
          </StyledLabelRowsPerPage>
          <img src={dividerIcon} alt="" />
        </>
      }
      labelDisplayedRows={() => (rowsPerPage === -1 ? "" : "개 씩 보기")}
      slotProps={{
        select: {
          IconComponent: () => (
            <StyledSelectPropsImg
              src={selectOpen ? chevronUpIcon : chevronDownIcon}
              alt=""
            />
          ),
          onClose: () => {
            setSelectOpen(false);
          },
          onOpen: () => {
            setSelectOpen(true);
          },
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
      onRowsPerPageChange={onRowsPerPageChange}
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

const StyledSelectPropsImg = styled.img`
  width: 12px;
  height: 12px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-8px, -50%);
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  pointer-events: none;
  user-select: none;

  // TODO: filter to gray600
`;
