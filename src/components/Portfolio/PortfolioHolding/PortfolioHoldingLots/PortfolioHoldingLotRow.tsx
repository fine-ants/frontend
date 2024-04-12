import usePortfolioHoldingPurchaseDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseDeleteMutation";
import usePortfolioHoldingPurchaseEditMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseEditMutation";
import { PurchaseHistoryField } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import { IconButton } from "@components/common/Buttons/IconButton";
import DatePicker from "@components/common/DatePicker/DatePicker";
import { thousandsDelimiter, useText } from "@fineants/demolition";
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { formatDate } from "@utils/date";
import { executeIfNumeric } from "@utils/executeIfNumeric";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
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

  const {
    value: newPurchasePricePerShare,
    onChange: onNewPurchasePricePerShareChange,
  } = useText({
    initialValue: thousandsDelimiter(purchasePricePerShare),
  });
  const newPurchasePricePerShareHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    executeIfNumeric(e.target.value.trim(), onNewPurchasePricePerShareChange);
  };

  const { value: newNumShares, onChange: onNewNumSharesChange } = useText({
    initialValue: thousandsDelimiter(numShares),
  });
  const newNumSharesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    executeIfNumeric(e.target.value.trim(), onNewNumSharesChange);
  };

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
        memo: newMemo.trim(),
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
              value={newPurchasePricePerShare}
              onChange={(e) => newPurchasePricePerShareHandler(e)}
            />
          </StyledTableCell>

          <StyledTableCell align="right" style={{ width: "119px" }}>
            <Input
              style={{ width: "100px", textAlign: "left" }}
              value={newNumShares}
              onChange={(e) => newNumSharesHandler(e)}
            />
          </StyledTableCell>

          <StyledTableCell align="left" style={{ width: "395px" }}>
            <StyledTextArea
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
            />
          </StyledTableCell>

          <StyledTableCell align="right" style={{ width: "32px" }}>
            <IconButton icon="check" size="h24" onClick={onSaveClick} />
          </StyledTableCell>

          <StyledTableCell align="right" style={{ width: "32px" }}>
            <IconButton
              icon="remove"
              size="h24"
              iconColor="custom"
              customColor={{
                color: "gray400",
                hoverColor: "gray50",
              }}
              onClick={onOpenDeleteConfirmAlert}
            />
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
            <IconButton
              icon="edit"
              size="h24"
              iconColor="gray"
              onClick={onEditClick}
            />
          </StyledTableCell>
          <StyledTableCell
            align="right"
            style={{ width: "40px !important", boxSizing: "border-box" }}>
            <IconButton
              icon="remove"
              size="h24"
              iconColor="gray"
              onClick={onOpenDeleteConfirmAlert}
            />
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
