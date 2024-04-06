import usePortfolioHoldingPurchaseAddMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseAddMutation";
import { IconButton } from "@components/common/Buttons/IconButton";
import DatePicker from "@components/common/DatePicker/DatePicker";
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  onDeleteButtonClick: () => void;
};
export default function PortfolioHoldingLotAddRow({
  portfolioId,
  portfolioHoldingId,
  onDeleteButtonClick,
}: Props) {
  const [newPurchaseDate, setNewPurchaseDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [newPurchasePricePerShare, setNewPurchasePricePerShare] = useState("");
  const [newNumShares, setNewNumShares] = useState("");
  const [newMemo, setNewMemo] = useState("");

  const { mutate: portfolioHoldingPurchaseAddMutate } =
    usePortfolioHoldingPurchaseAddMutation(portfolioId);

  const onSaveClick = () => {
    // TODO: Handle error
    portfolioHoldingPurchaseAddMutate({
      portfolioId,
      portfolioHoldingId,
      body: {
        purchaseDate: newPurchaseDate?.toISOString() ?? "",
        purchasePricePerShare: Number(newPurchasePricePerShare),
        numShares: Number(newNumShares),
        memo: newMemo.trim(),
      },
    });
    onPurchaseValuesRemove();
  };

  const onPurchaseValuesRemove = () => {
    setNewPurchaseDate(null);
    setNewPurchasePricePerShare("");
    setNewNumShares("");
    setNewMemo("");
    onDeleteButtonClick();
  };

  const isValid = newPurchaseDate && newPurchasePricePerShare && newNumShares;

  return (
    <MuiTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ width: "143px", padding: "0 8px 0 16px" }}>
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
          placeholder="매입가"
          value={newPurchasePricePerShare}
          onChange={(e) => setNewPurchasePricePerShare(e.target.value.trim())}
        />
      </StyledTableCell>

      <StyledTableCell align="right" style={{ width: "119px" }}>
        <Input
          style={{ width: "100px", textAlign: "left" }}
          type="number"
          placeholder="매입 개수"
          value={newNumShares}
          onChange={(e) => setNewNumShares(e.target.value.trim())}
        />
      </StyledTableCell>

      <StyledTableCell align="left" style={{ width: "395px" }}>
        <StyledTextArea
          value={newMemo}
          placeholder="메모를 입력하세요"
          onChange={(e) => setNewMemo(e.target.value)}
        />
      </StyledTableCell>

      <StyledTableCell align="right" sx={{ width: "32px" }}>
        <StyledIconButton
          icon="check"
          size="h24"
          iconColor="custom"
          customColor={{
            color: isValid ? "blue500" : "gray400",
            hoverColor: "gray50",
          }}
          disabled={!isValid}
          onClick={onSaveClick}
        />
      </StyledTableCell>

      <StyledTableCell align="right" sx={{ width: "32px" }}>
        <StyledIconButton icon="remove" size="h24" iconColor="gray" />
      </StyledTableCell>
    </MuiTableRow>
  );
}

const StyledTableCell = styled(MuiTableCell)`
  height: 40px;
  padding: 0 8px;
  font: ${designSystem.font.body3.font};

  color: ${designSystem.color.neutral.gray900};
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: ${designSystem.color.neutral.white};
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 2px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};

  &::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 24px;
  margin-top: 7px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: ${designSystem.color.neutral.white};
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 2px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
  text-align: left;

  &::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;

const StyledIconButton = styled(IconButton)`
  min-width: 100%;
`;
