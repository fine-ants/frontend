import usePortfolioHoldingPurchaseAddMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseAddMutation";
import BaseModal from "@components/BaseModal";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: number;
  portfolioHoldingId: number;
};

export default function PortfolioHoldingPurchaseAddModal({
  isOpen,
  onClose,
  portfolioId,
  portfolioHoldingId,
}: Props) {
  const { mutate: addPurchaseMutate } =
    usePortfolioHoldingPurchaseAddMutation(portfolioId);

  const [purchaseDate, setPurchaseDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [purchasePricePerShare, setPurchasePricePerShare] = useState("");
  const [numShares, setNumShares] = useState("");
  const [memo, setMemo] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    addPurchaseMutate({
      portfolioId,
      portfolioHoldingId,
      body: {
        purchaseDate: purchaseDate?.toISOString() ?? "",
        numShares: parseInt(numShares ?? 0),
        purchasePricePerShare: parseInt(purchasePricePerShare ?? 0),
        memo,
      },
    });

    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>종목 매입 이력 추가</div>
      <form onSubmit={onSubmit}>
        <FormControl>
          <DatePicker
            label="Purchase Date"
            value={purchaseDate}
            onChange={(newVal) => setPurchaseDate(newVal)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Price per Share</InputLabel>
          <Input
            type="number"
            slotProps={{
              input: {
                min: 0,
              },
            }}
            value={purchasePricePerShare}
            onChange={(e) => setPurchasePricePerShare(e.target.value.trim())}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Num Shares</InputLabel>
          <Input
            type="number"
            slotProps={{
              input: {
                min: 0,
              },
            }}
            value={numShares}
            onChange={(e) => setNumShares(e.target.value.trim())}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Memo</InputLabel>
          <Input
            value={memo}
            onChange={(e) => setMemo(e.target.value.trim())}
          />
        </FormControl>

        <Button type="submit">매입 이력 추가</Button>
      </form>
    </BaseModal>
  );
}
