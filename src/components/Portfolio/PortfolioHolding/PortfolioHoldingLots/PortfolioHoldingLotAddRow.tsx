import usePortfolioHoldingPurchaseAddMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseAddMutation";
import DatePicker from "@components/common/DatePicker/DatePicker";
import { Icon } from "@components/common/Icon";
import { useText } from "@fineants/demolition";
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { executeIfNumeric } from "@utils/executeIfNumeric";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
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

  const {
    value: newPurchasePricePerShare,
    onChange: onNewPurchasePricePerShareChange,
  } = useText();
  const onChangeNewPurchasePricePerShare = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    executeIfNumeric(e.target.value.trim(), onNewPurchasePricePerShareChange);
  };

  const { value: newNumShares, onChange: onNewNumSharesChange } = useText();
  const onChangeNewNumShares = (e: ChangeEvent<HTMLInputElement>) => {
    executeIfNumeric(e.target.value.trim(), onNewNumSharesChange);
  };

  const [newMemo, setNewMemo] = useState("");

  const { mutate: portfolioHoldingPurchaseAddMutate } =
    usePortfolioHoldingPurchaseAddMutation(portfolioId);

  const onSaveClick = () => {
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
    onNewPurchasePricePerShareChange("");
    onNewNumSharesChange("");
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
          placeholder="매입가"
          value={newPurchasePricePerShare}
          onChange={onChangeNewPurchasePricePerShare}
        />
      </StyledTableCell>

      <StyledTableCell align="right" style={{ width: "119px" }}>
        <Input
          style={{ width: "100px", textAlign: "left" }}
          placeholder="매입 개수"
          value={newNumShares}
          onChange={onChangeNewNumShares}
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
        <IconButton disabled={!isValid} onClick={onSaveClick}>
          <Icon
            icon="check"
            size={16}
            color={isValid ? "blue500" : "gray400"}
          />
        </IconButton>
      </StyledTableCell>

      <StyledTableCell align="right" sx={{ width: "32px" }}>
        <IconButton onClick={onPurchaseValuesRemove}>
          <Icon icon="remove" size={16} color={"gray600"} />
        </IconButton>
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

const IconButton = styled.button`
  width: 100%;
`;
