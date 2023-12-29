import usePortfolioHoldingPurchaseDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseDeleteMutation";
import usePortfolioHoldingPurchaseEditMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseEditMutation";
import { PurchaseHistoryField } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import Icon from "@components/common/Icon";
import { Button, Input, TableCell, TableRow } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { formatDate } from "@utils/date";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";

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

  // const onEditClick = () => {
  //   setIsEditing(true);
  // };

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
    <LotRow>
      {isEditing ? (
        <>
          <LotTableCell component="th" scope="row">
            <DatePicker
              label="Purchase Date"
              value={newPurchaseDate}
              onChange={(newVal) => setNewPurchaseDate(newVal)}
            />
          </LotTableCell>
          <LotTableCell align="right">
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
          </LotTableCell>
          <LotTableCell align="right">
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
          </LotTableCell>
          <LotTableCell align="right">
            <Input
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value.trim())}
            />
          </LotTableCell>
          <LotTableCell align="right" sx={{ width: "160px" }}>
            <Button onClick={onSaveClick}>저장</Button>
          </LotTableCell>
        </>
      ) : (
        <>
          <LotTableCell style={{ width: "119px" }} component="th" scope="row">
            {formatDate(purchaseDate)}
          </LotTableCell>

          <LotTableCell style={{ width: "119px" }} align="right">
            ₩{thousandsDelimiter(purchasePricePerShare)}
          </LotTableCell>

          <LotTableCell style={{ width: "119px" }} align="right">
            {numShares}
          </LotTableCell>

          <LotTableCell style={{ width: "443px" }}>{memo}</LotTableCell>

          <LotTableCell align="right" sx={{ width: "32px" }}>
            <Icon
              icon="remove"
              size={16}
              variant="tertiary"
              disabled={false}
              onClick={onOpenDeleteConfirmAlert}
            />
          </LotTableCell>

          <ConfirmAlert
            isOpen={isDeleteConfirmAlertOpen}
            title="매입 이력을 정말 삭제하시겠습니까?"
            onClose={onCloseDeleteConfirmAlert}
            onConfirm={onDeleteConfirm}
          />
        </>
      )}
    </LotRow>
  );
}

const LotRow = styled(TableRow)`
  width: 848px;
  height: 40px;

  & > :first-child {
    padding-left: 16px;
  }

  & > :last-child {
    padding-right: 16px;
  }
`;

const LotTableCell = styled(TableCell)`
  padding: 4px 8px;
  height: 40px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
`;
