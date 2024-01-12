import { PurchaseHistoryField } from "@api/portfolio/types";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableFooter as MuiTableFooter,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import PortfolioHoldingLotAddRow from "./PortfolioHoldingLotAddRow";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistory: PurchaseHistoryField[];
};

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
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
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
          <MuiTableFooter>
            <MuiTableRow>
              <MuiTableCell colSpan={5} sx={{ border: "none" }}>
                <Button
                  size="h32"
                  variant="secondary"
                  onClick={onAddLotButtonClick}>
                  항목 추가
                </Button>
              </MuiTableCell>
            </MuiTableRow>
          </MuiTableFooter>
        </StyledTableBody>
      </StyledTable>
    </div>
  );
}

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
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
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
  font: ${({ theme: { font } }) => font.title5};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;

const StyledTableBody = styled(MuiTableBody)`
  width: 100%;
`;
