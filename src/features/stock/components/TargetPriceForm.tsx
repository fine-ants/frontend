import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import { Icon } from "@components/Icon";
import { CustomTooltip } from "@components/Tooltips/CustomTooltip";
import useStockTargetPriceAddMutation from "@features/notification/api/queries/useStockTargetPriceAddMutation";
import {
  executeCbIfNumeric,
  removeThousandsDelimiter,
  useText,
} from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { InputAdornment, OutlinedInput } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function TargetPriceForm() {
  const { isMobile, isDesktop } = useResponsiveLayout();

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
    <StyledTargetPriceForm onSubmit={onSubmit} $isMobile={isMobile}>
      <CustomTooltip
        placement="bottom-start"
        title="종목 지정가 알림은 최대 5개까지 추가할 수 있습니다">
        <InputLabel $isDesktop={isDesktop}>
          지정가
          <Icon icon="help" size={16} color="gray400" />
        </InputLabel>
      </CustomTooltip>

      <Wrapper $isMobile={isMobile}>
        <OutlinedInput
          sx={outlinedInputSx(isMobile)}
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

        {isMobile && (
          <TextButton type="submit" size="h24" variant="default">
            추가
          </TextButton>
        )}

        {isDesktop && (
          <SubmitButton type="submit" size="h24" variant="primary">
            추가
          </SubmitButton>
        )}
      </Wrapper>
    </StyledTargetPriceForm>
  );
}

const StyledTargetPriceForm = styled.form<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  justify-content: ${({ $isMobile }) =>
    $isMobile ? "space-between" : "center"};
  align-items: flex-start;
  gap: ${({ $isMobile }) => ($isMobile ? "8px" : "16px")};
`;

const InputLabel = styled.label<{ $isDesktop: boolean }>`
  min-width: 80px;
  margin-top: ${({ $isDesktop }) => ($isDesktop ? "8px" : "0")};
  display: flex;
  align-items: center;
  gap: 4px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Wrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "row" : "column")};
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "0" : "24px")};
`;

const outlinedInputSx = (isMobile: boolean) => ({
  "width": "inherit",
  "height": isMobile ? "48px" : "32px",
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
});

const Currency = styled.span<{ $isTyping: boolean }>`
  color: ${({ $isTyping }) =>
    $isTyping
      ? designSystem.color.neutral.gray900
      : designSystem.color.neutral.gray400};
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
`;
