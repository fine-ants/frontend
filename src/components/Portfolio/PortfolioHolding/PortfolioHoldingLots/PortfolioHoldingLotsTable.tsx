import { PurchaseHistoryField } from "@api/portfolio/types";
import { Icon } from "@components/common/Icon";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableFooter as MuiTableFooter,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import PortfolioHoldingLotAddRow from "./PortfolioHoldingLotAddRow";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistory: PurchaseHistoryField[];
};

// TODO: PlainTable을 사용하도록 수정
export default function PortfolioHoldingLotsTable({
  portfolioId,
  portfolioHoldingId,
  purchaseHistory,
}: Props) {
  const [isAddLotMode, setIsAddLotMode] = useState(false);

  const onAddLotButtonClick = () => {
    setIsAddLotMode(true);
  };

  const onDeleteLotButtonClick = () => {
    setIsAddLotMode(false);
  };

  return (
    <StyledPortfolioHoldingLotsTable>
      <StyledTable size="small" aria-label="purchases">
        <StyledTableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell style={{ width: "151px" }}>
              매입 날짜
            </StyledTableHeadCell>
            <StyledTableHeadCell style={{ width: "119px" }} align="right">
              매입가
            </StyledTableHeadCell>
            <StyledTableHeadCell style={{ width: "119px" }} align="right">
              개수
            </StyledTableHeadCell>
            <StyledTableHeadCell style={{ width: "395px" }}>
              메모
            </StyledTableHeadCell>
            <StyledTableHeadCell style={{ width: "32px" }}>
              <Icon icon="edit" size={16} color={"gray600"} />
            </StyledTableHeadCell>

            <StyledTableHeadCell style={{ width: "40px" }}>
              <Icon icon="remove" size={16} color={"gray600"} />
            </StyledTableHeadCell>
          </StyledTableHeadRow>
        </StyledTableHead>

        <StyledTableBody>
          {purchaseHistory.map((lot) => (
            <PortfolioHoldingLotRow
              key={lot.purchaseHistoryId}
              portfolioId={portfolioId}
              portfolioHoldingId={portfolioHoldingId}
              lot={lot}
            />
          ))}
          {isAddLotMode && (
            <PortfolioHoldingLotAddRow
              portfolioId={portfolioId}
              portfolioHoldingId={portfolioHoldingId}
              onDeleteButtonClick={onDeleteLotButtonClick}
            />
          )}
        </StyledTableBody>

        <MuiTableFooter>
          <MuiTableRow>
            <MuiTableCell
              colSpan={6}
              sx={{ paddingInline: "8px", border: "none" }}>
              <AddLotButton onClick={onAddLotButtonClick}>
                <Icon icon="add" size={16} color="blue500" />
                <span>항목 추가</span>
              </AddLotButton>
            </MuiTableCell>
          </MuiTableRow>
        </MuiTableFooter>
      </StyledTable>
    </StyledPortfolioHoldingLotsTable>
  );
}

const StyledPortfolioHoldingLotsTable = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const StyledTable = styled(MuiTable)`
  width: 856px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTableHead = styled(MuiTableHead)`
  width: 856px;
  margin-left: auto;

  & > tr:last-child {
    td {
      padding-bottom: 8px;
    }
  }
`;

const StyledTableHeadRow = styled(MuiTableRow)`
  width: 856px;
  background-color: ${designSystem.color.neutral.gray50};
  border-radius: 8px;

  & > * {
    border: none;
  }

  & > .MuiTableCell-root:first-child {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  & > .MuiTableCell-root:last-child {
    padding-right: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const StyledTableHeadCell = styled(MuiTableCell)`
  height: 40px;
  padding: 4px 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const StyledTableBody = styled(MuiTableBody)`
  width: 100%;
`;

const AddLotButton = styled.button`
  height: 24px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font: ${designSystem.font.button2.font};
    letter-spacing: ${designSystem.font.button2.letterSpacing};
    color: ${designSystem.color.primary.blue500};
  }
`;
