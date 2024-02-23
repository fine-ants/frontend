import usePortfolioHoldingPurchaseDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseDeleteMutation";
import usePortfolioHoldingPurchaseEditMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseEditMutation";
import { PurchaseHistoryField } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import DatePicker from "@components/common/DatePicker/DatePicker";
import { Icon } from "@components/common/Icon";
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { formatDate } from "@utils/date";
import { thousandsDelimiter } from "@utils/delimiters";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  lot: PurchaseHistoryField;
};

export default function PortfolioHoldingStyledTableRow({
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
    dayjs(purchaseDate)
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
    <StyledTableRow>
      {isEditing ? (
        <>
          <StyledTableCell
            component="th"
            scope="row"
            style={{ width: "143px" }}>
            <DatePicker
              size="small"
              value={newPurchaseDate}
              onChange={(newVal) => setNewPurchaseDate(newVal)}
            />
          </StyledTableCell>
          <StyledTableCell align="right" style={{ width: "119px" }}>
            <Input
              style={{ width: "100px", textAlign: "left" }}
              type="number"
              value={newPurchasePricePerShare}
              onChange={(e) =>
                setNewPurchasePricePerShare(e.target.value.trim())
              }
            />
          </StyledTableCell>

          <StyledTableCell align="right" style={{ width: "119px" }}>
            <Input
              style={{ width: "100px", textAlign: "left" }}
              type="number"
              value={newNumShares}
              onChange={(e) => setNewNumShares(e.target.value.trim())}
            />
          </StyledTableCell>

          <StyledTableCell align="left" style={{ width: "395px" }}>
            <StyledTextArea
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value.trim())}
            />
          </StyledTableCell>

          <StyledTableCell align="right" style={{ width: "32px" }}>
            <IconButton onClick={onSaveClick}>
              <Icon icon="check" size={16} color={"blue500"} />
            </IconButton>
          </StyledTableCell>

          <StyledTableCell align="right" style={{ width: "32px" }}>
            <IconButton onClick={onOpenDeleteConfirmAlert}>
              <Icon icon="remove" size={16} color={"gray400"} />
            </IconButton>
          </StyledTableCell>
        </>
      ) : (
        <>
          <StyledTableCell
            style={{ width: "151px" }}
            component="th"
            scope="row">
            {formatDate(purchaseDate)}
          </StyledTableCell>

          <StyledTableCell style={{ width: "119px" }} align="right">
            ₩{thousandsDelimiter(purchasePricePerShare)}
          </StyledTableCell>

          <StyledTableCell style={{ width: "119px" }} align="right">
            {numShares}
          </StyledTableCell>

          <StyledTableCell style={{ width: "395px" }}>{memo}</StyledTableCell>

          <StyledTableCell style={{ width: "32px" }}>
            <IconButton onClick={onEditClick}>
              <Icon icon="edit" size={16} color={"gray600"} />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell
            align="right"
            style={{ width: "40px !important", boxSizing: "border-box" }}>
            <IconButton onClick={onOpenDeleteConfirmAlert}>
              <Icon icon="remove" size={16} color={"gray600"} />
            </IconButton>
          </StyledTableCell>

          <ConfirmAlert
            isOpen={isDeleteConfirmAlertOpen}
            title="매입 이력을 정말 삭제하시겠습니까?"
            onClose={onCloseDeleteConfirmAlert}
            onConfirm={onDeleteConfirm}
          />
        </>
      )}
    </StyledTableRow>
  );
}

const StyledTableRow = styled(MuiTableRow)`
  width: 856px;
  height: 40px;
  padding: 8px 16px;
  box-sizing: border-box;

  & > .MuiTableCell-root {
    border-bottom: 1px solid ${designSystem.color.neutral.gray100};
  }

  & > :first-child {
    padding-left: 16px;
  }

  & > :last-child {
    padding-right: 16px;
  }
`;

const StyledTableCell = styled(MuiTableCell)`
  padding: 4px 8px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid ${designSystem.color.neutral.gray200};
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
  background-color: ${designSystem.color.neutral.white};
  border-radius: 2px;

  &::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;

const StyledTextArea = styled.textarea`
  margin-top: 7px;
  width: 100%;
  height: 24px;
  padding: 0 8px;
  border: 1px solid ${designSystem.color.neutral.gray200};
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
  background-color: ${designSystem.color.neutral.white};
  border-radius: 2px;
  box-sizing: border-box;

  &::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;

const IconButton = styled.button`
  width: 100%;
`;
