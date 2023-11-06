import { PurchaseHistoryField } from "@api/portfolio";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";
import PortfolioHoldingPurchaseAddModal from "./PortfolioHoldingPurchaseAddModal";

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
  const [isAddHoldingPurchaseModalOpen, setIsAddHoldingPurchaseModalOpen] =
    useState(false);

  const onAddPurchaseClick = () => {
    setIsAddHoldingPurchaseModalOpen(true);
  };

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>매입 날짜</TableCell>
            <TableCell align="right">매입가</TableCell>
            <TableCell align="right">매입 개수</TableCell>
            <TableCell align="right">메모</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseHistory.map((lot) => (
            <PortfolioHoldingLotRow
              key={lot.purchaseHistoryId}
              portfolioId={portfolioId}
              portfolioHoldingId={portfolioHoldingId}
              lot={lot}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={5} sx={{ border: "none" }}>
              <Button variant="text" onClick={onAddPurchaseClick}>
                매입 이력 추가
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <PortfolioHoldingPurchaseAddModal
        isOpen={isAddHoldingPurchaseModalOpen}
        onClose={() => setIsAddHoldingPurchaseModalOpen(false)}
        portfolioId={portfolioId}
        portfolioHoldingId={portfolioHoldingId}
      />
    </>
  );
}
