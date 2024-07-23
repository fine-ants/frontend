import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function PortfolioWeightPieChartToolTip({
  active,
  payload, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const totalGain = payload?.[0]?.payload?.totalGain;
  const totalGainRate = payload?.[0]?.payload?.totalGainRate;

  if (active && payload && payload.length) {
    return (
      <TooltipBox
        aria-label={`${payload[0].name} 비중 - ${Math.floor(
          payload[0].payload.weight
        )}`}>
        <TooltipContainer>
          <ItemTitle>
            <ColorCircle color={payload[0].payload.fill} />
            <p>{payload[0].name}</p>
          </ItemTitle>
          <Percentage>{Math.floor(payload[0].payload.weight)}%</Percentage>
        </TooltipContainer>
        <TooltipContainer>
          ₩{thousandsDelimiter(payload[0].value)}
        </TooltipContainer>
        <TooltipContainer>
          <GainValue>₩{thousandsDelimiter(totalGain)}</GainValue>
          <GainValue>{totalGainRate}%</GainValue>
        </TooltipContainer>
      </TooltipBox>
    );
  }

  return null;
}

const TooltipBox = styled.div`
  height: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #e0e2ec;
  border-radius: 4px;
  gap: 4px;
`;

const TooltipContainer = styled.div`
  height: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  line-height: 17px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > p {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }
`;

const ColorCircle = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const Percentage = styled.div`
  margin-left: auto;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;

const GainValue = styled.p`
  display: flex;
  align-items: center;
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.state.green500};
`;
