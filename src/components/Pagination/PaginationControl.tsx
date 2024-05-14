import { LabelRowsPerPage } from "@components/Pagination/LabelRowsPerPage";
import { PaginationSelect } from "@components/Pagination/PaginationSelect";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  count: number;
  startRow: number | undefined;
  endRow: number | undefined;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (value: string) => void;
};

export function PaginationControl({
  count,
  startRow,
  endRow,
  rowsPerPage,
  rowsPerPageOptions,
  onRowsPerPageChange,
}: Props) {
  return (
    <StyledPaginationControl>
      <LabelRowsPerPage count={count} startRow={startRow} endRow={endRow} />
      <PaginationSelectWrapper>
        <PaginationSelect
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </PaginationSelectWrapper>
      {rowsPerPage !== -1 && (
        <LabelDisplayedRows>개 씩 보기</LabelDisplayedRows>
      )}
    </StyledPaginationControl>
  );
}

const StyledPaginationControl = styled.div`
  display: flex;
  align-items: center;
`;

const LabelDisplayedRows = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const PaginationSelectWrapper = styled.div`
  width: 66px;
`;
