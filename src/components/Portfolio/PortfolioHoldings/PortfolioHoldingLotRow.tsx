import { PurchaseHistoryField } from "@api/portfolio";
import usePortfolioHoldingPurchaseDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseDeleteMutation";
import usePortfolioHoldingPurchaseEditMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseEditMutation";
import ConfirmAlert from "@components/ConfirmAlert";
import { Button, Input, TableCell, TableRow } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { formatDate } from "@utils/date";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  lot: PurchaseHistoryField;
};

export default function PortfolioHoldingLotRow({
  portfolioId,
  portfolioHoldingId,
  lot: {
    purchaseHistoryId,
    purchaseDate,
    purchasePricePerShare,
    numShares,
    memo,
  },
}: Props) {
  const { mutate: portfolioHoldingPurchaseEditMutate } =
    usePortfolioHoldingPurchaseEditMutation({
      portfolioId,
      portfolioHoldingId,
      purchaseHistoryId,
    });

  const { mutate: portfolioHoldingPurchaseDeleteMutate } =
    usePortfolioHoldingPurchaseDeleteMutation({
      portfolioId,
      portfolioHoldingId,
      purchaseHistoryId,
    });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmAlertOpen, setIsDeleteConfirmAlertOpen] =
    useState(false);

  const [newPurchaseDate, setNewPurchaseDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [newPurchasePricePerShare, setNewPurchasePricePerShare] = useState(
    purchasePricePerShare.toString()
  );
  const [newNumShares, setNewNumShares] = useState(numShares.toString());
  const [newMemo, setNewMemo] = useState(memo ?? "");

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onSaveClick = () => {
    // TODO: Handle error
    portfolioHoldingPurchaseEditMutate({
      portfolioId,
      portfolioHoldingId,
      purchaseHistoryId,
      body: {
        purchaseDate: newPurchaseDate?.toISOString() ?? "",
        purchasePricePerShare: Number(newPurchasePricePerShare),
        numShares: Number(newNumShares),
        memo: newMemo,
      },
    });

    setIsEditing(false);
  };

  const onOpenDeleteConfirmAlert = () => {
    setIsDeleteConfirmAlertOpen(true);
  };

  const onCloseDeleteConfirmAlert = () => {
    setIsDeleteConfirmAlertOpen(false);
  };

  const onDeleteConfirm = () => {
    // TODO: Handle error
    portfolioHoldingPurchaseDeleteMutate({
      portfolioId,
      portfolioHoldingId,
      purchaseHistoryId,
    });
  };

  return (
    <TableRow>
      {isEditing ? (
        <>
          <TableCell component="th" scope="row">
            <DatePicker
              label="Purchase Date"
              value={newPurchaseDate}
              onChange={(newVal) => setNewPurchaseDate(newVal)}
            />
          </TableCell>
          <TableCell align="right">
            <Input
              type="number"
              slotProps={{
                input: {
                  min: 0,
                },
              }}
              value={newPurchasePricePerShare}
              onChange={(e) =>
                setNewPurchasePricePerShare(e.target.value.trim())
              }
            />
          </TableCell>
          <TableCell align="right">
            <Input
              type="number"
              slotProps={{
                input: {
                  min: 0,
                },
              }}
              value={newNumShares}
              onChange={(e) => setNewNumShares(e.target.value.trim())}
            />
          </TableCell>
          <TableCell align="right">
            <Input
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value.trim())}
            />
          </TableCell>
          <TableCell align="right" sx={{ width: "160px" }}>
            <Button onClick={onSaveClick}>저장</Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell component="th" scope="row">
            {formatDate(purchaseDate)}
          </TableCell>
          <TableCell align="right">{purchasePricePerShare}</TableCell>
          <TableCell align="right">{numShares}</TableCell>
          <TableCell align="right">{memo}</TableCell>
          <TableCell align="right" sx={{ width: "160px" }}>
            <Button onClick={onEditClick}>수정</Button>
            <Button onClick={onOpenDeleteConfirmAlert}>삭제</Button>
          </TableCell>
          <ConfirmAlert
            isOpen={isDeleteConfirmAlertOpen}
            title="매입 이력 삭제"
            content="매입 이력을 정말 삭제하시겠습니까?"
            onClose={onCloseDeleteConfirmAlert}
            onConfirm={onDeleteConfirm}
          />
        </>
      )}
    </TableRow>
  );
}
