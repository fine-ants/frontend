import usePortfolioHoldingPurchaseAddMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseAddMutation";
import { Icon } from "@components/common/Icon";
import { TableCell } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import styled from "styled-components";
import { IconCalendar } from "./IconCalendar";

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
  const [newPurchaseDate, setNewPurchaseDate] = useState<Date | null>(null);
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
        memo: newMemo,
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
    <>
      <LotTableCell
        component="th"
        scope="row"
        style={{ width: "143px", padding: "0 8px 0 16px" }}>
        <DatePicker
          value={newPurchaseDate}
          onChange={(newVal) => setNewPurchaseDate(newVal)}
          format="YYYY-MM-DD"
          slotProps={{
            textField: { placeholder: "매입 날짜" },
          }}
          slots={{
            openPickerIcon: IconCalendar,
          }}
        />
      </LotTableCell>
      <LotTableCell align="right" style={{ width: "119px" }}>
        <Input
          style={{ width: "100px", textAlign: "left" }}
          type="number"
          placeholder="매입가"
          value={newPurchasePricePerShare}
          onChange={(e) => setNewPurchasePricePerShare(e.target.value.trim())}
        />
      </LotTableCell>

      <LotTableCell align="right" style={{ width: "119px" }}>
        <Input
          style={{ width: "100px", textAlign: "left" }}
          type="number"
          placeholder="매입 개수"
          value={newNumShares}
          onChange={(e) => setNewNumShares(e.target.value.trim())}
        />
      </LotTableCell>

      <LotTableCell align="left" style={{ width: "395px" }}>
        <TextInput
          value={newMemo}
          placeholder="메모를 입력하세요"
          onChange={(e) => setNewMemo(e.target.value.trim())}
        />
      </LotTableCell>

      <LotTableCell align="right" sx={{ width: "32px" }}>
        <IconButton onClick={onSaveClick}>
          <Icon
            icon="check"
            size={16}
            color={isValid ? "blue500" : "gray400"}
          />
        </IconButton>
      </LotTableCell>

      <LotTableCell align="right" sx={{ width: "32px" }}>
        <IconButton onClick={onPurchaseValuesRemove}>
          <Icon icon="remove" size={16} color={"gray600"} />
        </IconButton>
      </LotTableCell>
    </>
  );
}

const LotTableCell = styled(TableCell)`
  padding: 0 8px;
  height: 40px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
  text-align: center;
`;

const IconButton = styled.button`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 2px;

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  }
`;

const TextInput = styled.textarea`
  margin-top: 7px;
  width: 100%;
  height: 24px;
  text-align: left;
  padding: 0 8px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 2px;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  }
`;
