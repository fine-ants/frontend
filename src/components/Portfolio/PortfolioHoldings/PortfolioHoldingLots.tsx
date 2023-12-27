import { PurchaseHistoryField } from "@api/portfolio/types";
import Button from "@components/common/Buttons/Button";
import Icon from "@components/common/Icon";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";
import PortfolioHoldingPurchaseAddDialog from "./PortfolioHoldingPurchaseAddDialog";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistory: PurchaseHistoryField[];
};

export default function PortfolioHoldingLots({
  portfolioId,
  portfolioHoldingId,
  purchaseHistory,
}: Props) {
  const [isAddHoldingPurchaseDialogOpen, setIsAddHoldingPurchaseDialogOpen] =
    useState(false);

  const onAddPurchaseClick = () => {
    setIsAddHoldingPurchaseDialogOpen(true);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
      <LotsTable size="small" aria-label="purchases">
        <LostTableHead>
          <LotsTableHeadRow>
            <LotsTableHeadCell style={{ width: "119px" }}>
              매입 날짜
            </LotsTableHeadCell>
            <LotsTableHeadCell style={{ width: "119px" }} align="right">
              매입가
            </LotsTableHeadCell>
            <LotsTableHeadCell style={{ width: "119px" }} align="right">
              개수
            </LotsTableHeadCell>
            <LotsTableHeadCell style={{ width: "443px" }}>
              메모
            </LotsTableHeadCell>
            <LotsTableHeadCell style={{ width: "32px" }}>
              <Icon
                icon="remove"
                size={16}
                variant="tertiary"
                disabled={false}
              />
            </LotsTableHeadCell>
          </LotsTableHeadRow>
        </LostTableHead>

        {/* <TableRow style={{ height: "8px" }} /> */}

        <LotsTableBody>
          {purchaseHistory.map((lot) => (
            <PortfolioHoldingLotRow
              key={lot.purchaseHistoryId}
              portfolioId={portfolioId}
              portfolioHoldingId={portfolioHoldingId}
              lot={lot}
            />
          ))}
        </LotsTableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} sx={{ border: "none" }}>
              <Button
                icon="add"
                size="h32"
                variant="secondary"
                onClick={onAddPurchaseClick}>
                항목 추가
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </LotsTable>

      <PortfolioHoldingPurchaseAddDialog
        isOpen={isAddHoldingPurchaseDialogOpen}
        onClose={() => setIsAddHoldingPurchaseDialogOpen(false)}
        portfolioId={portfolioId}
        portfolioHoldingId={portfolioHoldingId}
      />
    </div>
  );
}

const LotsTable = styled(Table)`
  width: 856px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LostTableHead = styled(TableHead)`
  & > tr:last-child {
    td {
      padding-bottom: 8px;
    }
  }
`;

const LotsTableHeadRow = styled(TableRow)`
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
  overflow: hidden;

  & > * {
    border-bottom: none;
  }

  & > .MuiTableCell-root:first-child {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & > .MuiTableCell-root:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-right: 16px;
  }
`;

const LotsTableHeadCell = styled(TableCell)`
  padding: 4px 8px;
  height: 40px;
  color: ${({ theme: { color } }) => color.neutral.gray600};
  font: ${({ theme: { font } }) => font.title5};
`;

const LotsTableBody = styled(TableBody)``;
