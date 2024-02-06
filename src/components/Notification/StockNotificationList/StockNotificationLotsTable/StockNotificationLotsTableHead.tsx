import { TableCell, TableHead, TableRow } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function StockNoficiationLotsTableHead() {
  return (
    <StyledStockNoficiationLotsTableHead>
      <StyledTableRow>
        <StyledTableCell sx={{ width: "1180px" }} align="left" colSpan={2}>
          <span>지정가</span>
        </StyledTableCell>

        {/* <StyledTableCell sx={{ width: "140px" }} align="center">
          <span>삭제</span>
        </StyledTableCell> */}
      </StyledTableRow>

      <TableRow sx={{ height: "8px" }} />
    </StyledStockNoficiationLotsTableHead>
  );
}

const StyledStockNoficiationLotsTableHead = styled(TableHead)`
  height: 48px;
`;

const StyledTableRow = styled(TableRow)`
  height: 40px;
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  background-color: ${designSystem.color.neutral.gray50};
  border: none;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};

  &:first-of-type {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-of-type {
    padding-right: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  & > span {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }
`;
