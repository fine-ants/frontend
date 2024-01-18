import { thousandsDelimiter } from "@utils/delimiters";
import styled from "styled-components";

export default function PortfolioWeightPieChartToolTip({
  active,
  payload, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const totalGain = payload?.[0]?.payload?.totalGain;
  const totalGainRate = payload?.[0]?.payload?.totalGainRate;

  if (active && payload && payload.length) {
    return (
      <TooltipBox>
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
          <GainValue>
            {totalGain >= 0 ? "+" : "-"}₩{thousandsDelimiter(totalGain)}
          </GainValue>
          <GainValue>
            {totalGainRate >= 0 ? "+" : "-"}
            {totalGainRate}%
          </GainValue>
        </TooltipContainer>
      </TooltipBox>
    );
  }

  return null;
}

const TooltipBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  background-color: #ffffff;
  border: 1px solid #e0e2ec;
  border-radius: 4px;
  padding: 8px;
  gap: 4px;
`;

const TooltipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 17px;
  gap: 16px;
  font-size: 14px;
  line-height: 17px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > p {
    font: ${({ theme: { font } }) => font.title5};
    letter-spacing: -0.02em;
    color: ${({ theme: { color } }) => color.neutral.gray600};
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
  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
  color: ${({ theme: { color } }) => color.primary.blue500};
`;

const GainValue = styled.p`
  display: flex;
  align-items: center;
  font: ${({ theme: { font } }) => font.body4};
  color: ${({ theme: { color } }) => color.state500};
`;
