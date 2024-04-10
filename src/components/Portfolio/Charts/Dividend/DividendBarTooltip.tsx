import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DividendBarTooltip({ active, payload, label }: any) {
  if (active && payload.length > 0) {
    const currentYear = new Date().getFullYear();

    const month = parseInt(label, 10);
    const paddedMonth = month.toString().padStart(2, "0");

    const dividendAmount = payload[0].value;

    return (
      <StyledDividendBarTooltip>
        <label>
          {currentYear}-{paddedMonth}
        </label>
        <span>₩{thousandsDelimiter(dividendAmount)}</span>
      </StyledDividendBarTooltip>
    );
  }

  return null;
}

const StyledDividendBarTooltip = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 4px;
  border: 1px solid ${designSystem.color.neutral.gray100};
  box-shadow: 0px 0px 12px 0px #00000014;

  > label {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;
