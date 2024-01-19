import designSystem from "@styles/designSystem";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DividendBarTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const currentYear = new Date().getFullYear();

    const month = parseInt(label, 10);
    // 월이 10보다 작으면 앞에 '0'을 붙임
    const formattedMonth = month.toString().padStart(2, "0");
    return (
      <StyledDividendBarTooltip>
        <label>
          {currentYear}-{formattedMonth}
        </label>
        <span>{payload[0].value}원</span>
      </StyledDividendBarTooltip>
    );
  }

  return null;
}

const StyledDividendBarTooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 4px;
  padding: 8px;
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
