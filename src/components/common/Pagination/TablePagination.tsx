import chevronDownIcon from "@assets/icons/ic_chevron-down.svg";
import chevronUpIcon from "@assets/icons/ic_chevron-up.svg";
import dividerIcon from "@assets/icons/ic_divider.svg";
import {
  TablePagination as MuiTablePagination,
  tablePaginationClasses,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

type Props = {
  count: number;
};

export default function TablePagination({ count }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { startRow, endRow } = calculateStartAndEndRows(
    count,
    page + 1,
    rowsPerPage
  );

  return (
    <StyledTablePagination
      count={count}
      colSpan={3}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
      labelRowsPerPage={
        <>
          <StyledLabelRowsPerPage>
            전체 <span>{count}</span> 중{" "}
            <span>
              {startRow}-{endRow}
            </span>
          </StyledLabelRowsPerPage>
          <img src={dividerIcon} alt="" />
        </>
      }
      // TODO: synchronize page number with Pagination component
      ActionsComponent={() => <Pagination count={count} />}
      labelDisplayedRows={() => "개 씩 보기"} // none
      SelectProps={{
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
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

const StyledTablePagination = styled(MuiTablePagination)`
  & .${tablePaginationClasses.spacer} {
    display: none;
  }

  & .${tablePaginationClasses.toolbar} {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    background-color: #fff;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${tablePaginationClasses.input} {
    margin: 0;
  }

  & .${tablePaginationClasses.displayedRows} {
    margin: 0;
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray600};

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${tablePaginationClasses.select} {
    min-width: 49px;
    height: 24px;
    margin: 0;
    padding: 0 8px; // TODO: Adjust padding-right
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
    border-radius: 2px;
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray900};

    &:hover {
      background-color: lightgrey;
    }

    &:focus {
      outline: 1px solid blue;
    }
  }

  & .${tablePaginationClasses.actions} {
    margin: 0;
    padding: 2px;
    border: 1px solid blue;
    border-radius: 50px;
    text-align: center;
  }

  & .${tablePaginationClasses.actions} > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 4px;
    background-color: transparent;
    color: black;

    &:hover {
      background-color: grey;
    }

    &:focus {
      outline: 1px solid blue;
    }

    &:disabled {
      opacity: 0.3;
    }
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
  transform: translate(-50%, -50%);
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  pointer-events: none;
  user-select: none;

  // TODO: filter to gray600
`;

const calculateStartAndEndRows = (
  totalNumRows: number,
  currentPage: number,
  rowsPerPage: number
) => {
  if (currentPage < 1 || rowsPerPage < 1 || totalNumRows < 0) return {};

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalNumRows);

  // If the page number exceeds the available rows.
  // Ex: totalNumRows = 100, currentPage = 11, rowsPerPage = 10
  if (startRow > totalNumRows) return {};

  return { startRow, endRow };
};
