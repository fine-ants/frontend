import { IconButton } from "@components/Buttons/IconButton";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import DatePicker from "@components/DatePicker";
import { TextField } from "@components/TextField/TextField";
import { PurchaseHistory } from "@features/portfolio/api/types";
import {
  executeCbIfNumeric,
  removeThousandsDelimiter,
  thousandsDelimiter,
  useText,
} from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

type Props = {
  lot?: PurchaseHistory;
  onMutate: (body: SubmitBodyType) => void;
  onDeleteConfirmAlertOpen: () => void;
};

type SubmitBodyType = {
  purchaseDate: string;
  numShares: number;
  purchasePricePerShare: number;
  memo: string;
};

export default function PortfolioHoldingAddOrEditLots({
  lot = {} as PurchaseHistory,
  onMutate,
  onDeleteConfirmAlertOpen,
}: Props) {
  const {
    purchaseDate = new Date().toISOString(),
    purchasePricePerShare = 0,
    numShares = 0,
    memo = "",
  } = lot;

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
    executeCbIfNumeric({
      value: e.target.value.trim(),
      callback: onNewPurchasePricePerShareChange,
    });
  };

  const { value: newNumShares, onChange: onNewNumSharesChange } = useText({
    initialValue: thousandsDelimiter(numShares),
  });
  const newNumSharesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    executeCbIfNumeric({
      value: e.target.value.trim(),
      callback: onNewNumSharesChange,
    });
  };

  const [newMemo, setNewMemo] = useState(memo ?? "");

  const onPurchaseValuesRemove = () => {
    setNewPurchaseDate(null);
    onNewPurchasePricePerShareChange("");
    onNewNumSharesChange("");
    setNewMemo("");
  };

  const onSubmit = () => {
    const body = {
      purchaseDate: newPurchaseDate?.toISOString() ?? "",
      purchasePricePerShare: Number(
        removeThousandsDelimiter(newPurchasePricePerShare)
      ),
      numShares: Number(removeThousandsDelimiter(newNumShares)),
      memo: newMemo.trim(),
    };

    onMutate(body);
    onPurchaseValuesRemove();
  };

  // const isLotEmpty = Object.keys(lot).length === 0;

  // const isDisabledButton = isLotEmpty ? newPurchaseDate && newPurchasePricePerShare && newNumShares :

  return (
    <>
      <CardItemRow title="">
        <ButtonWrapper>
          <IconButton
            icon="check"
            size="h32"
            iconColor="gray"
            onClick={onSubmit}
          />
          <IconButton
            icon="trash"
            size="h32"
            iconColor="gray"
            onClick={onDeleteConfirmAlertOpen}
          />
        </ButtonWrapper>
      </CardItemRow>

      <CardItemRow title="매입 날짜">
        <Content>
          <DatePicker
            size="small"
            value={newPurchaseDate}
            onChange={(newVal) => setNewPurchaseDate(newVal)}
          />
        </Content>
      </CardItemRow>
      <CardItemRow title="매입가">
        <Content>
          <TextField
            placeholder="매입가"
            size="h32"
            value={newPurchasePricePerShare}
            onChange={newPurchasePricePerShareHandler}
          />
        </Content>
      </CardItemRow>
      <CardItemRow title="개수">
        <Content>
          <TextField
            placeholder="개수"
            size="h32"
            value={newNumShares}
            onChange={newNumSharesHandler}
          />
        </Content>
      </CardItemRow>
      <CardItemRow title="메모">
        <StyledTextArea
          placeholder="메모"
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
        />
      </CardItemRow>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Content = styled.div`
  width: 200px;
  height: 32px;
`;
const StyledTextArea = styled.textarea`
  width: 200px;
  height: 64px;
  padding: 4px 8px;
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 2px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
  background-color: ${designSystem.color.neutral.white};
  text-align: left;
  box-sizing: border-box;

  &::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;
