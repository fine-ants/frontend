import useStockTargetPriceAddMutation from "@api/notifications/queries/useStockTargetPriceAddMutation";
import Button from "@components/common/Buttons/Button";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { Icon } from "@components/common/Icon";
import {
  executeCbIfNumeric,
  removeThousandsDelimiter,
  useText,
} from "@fineants/demolition";
import { InputAdornment, OutlinedInput } from "@mui/material";
import designSystem from "@styles/designSystem";

import { ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function StockTargetPriceForm() {
  const { tickerSymbol } = useParams();

  const { mutate: addStockTargetPrice } = useStockTargetPriceAddMutation(
    tickerSymbol as string
  );

  const { value: targetPrice, onChange: onTargetPriceChange } = useText();
  const targetPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    executeCbIfNumeric({
      value: e.target.value.trim(),
      callback: onTargetPriceChange,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addStockTargetPrice(Number(removeThousandsDelimiter(targetPrice)));
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputContainer>
        <CustomTooltip
          arrow
          placement="bottom-start"
          title="종목 지정가 알림은 최대 5개까지 추가할 수 있습니다">
          <InputLabel>
            지정가
            <Icon icon="help" size={16} color="gray400" />
          </InputLabel>
        </CustomTooltip>

        <OutlinedInput
          sx={outlinedInputSx}
          placeholder="지정가를 입력하세요"
          value={targetPrice}
          onChange={targetPriceHandler}
          endAdornment={
            <InputAdornment position="end">
              <Currency $isTyping={!!targetPrice}>₩</Currency>
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "종목 지정가 알림 추가",
          }}
        />
      </InputContainer>

      <SubmitButton type="submit" size="h24" variant="primary">
        추가
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const outlinedInputSx = {
  "width": "232px",
  "height": "inherit",
  "borderRadius": "3px",

  "&:hover": {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: designSystem.color.primary.blue500,
    },
  },

  ".MuiInputBase-input": {
    "font": designSystem.font.body3.font,
    "color": designSystem.color.neutral.gray900,

    "&::placeholder": {
      color: designSystem.color.neutral.gray400,
    },
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${designSystem.color.neutral.gray200}`,
  },
};

const Currency = styled.span<{ $isTyping: boolean }>`
  color: ${({ $isTyping }) =>
    $isTyping
      ? designSystem.color.neutral.gray900
      : designSystem.color.neutral.gray400};
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
`;
