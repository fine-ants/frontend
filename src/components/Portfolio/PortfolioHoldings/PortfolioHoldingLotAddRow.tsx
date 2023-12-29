import usePortfolioHoldingPurchaseAddMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseAddMutation";
import { Icon } from "@components/common/Icon";
import { TableCell } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
};
export default function PortfolioHoldingLotAddRow({
  portfolioId,
  portfolioHoldingId,
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
  };

  const onPurchaseValuesRemove = () => {
    setNewPurchaseDate(null);
    setNewPurchasePricePerShare("");
    setNewNumShares("");
    setNewMemo("");
  };

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
        <Icon onClick={onSaveClick} icon="check" size={16} color={"blue500"} />
      </LotTableCell>

      <LotTableCell align="right" sx={{ width: "32px" }}>
        <Icon
          icon="remove"
          size={16}
          color={"gray600"}
          onClick={onPurchaseValuesRemove}
        />
      </LotTableCell>
    </>
  );
}

const LotTableCell = styled(TableCell)`
  padding: 0 8px;
  height: 40px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
`;

const Input = styled.input`
  width: 100%;
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
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 24px;
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
`;
