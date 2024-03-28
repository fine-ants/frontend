import designSystem from "@styles/designSystem";
import styled from "styled-components";

export type Props = {
  color: string;
  title: string;
  percent: number;
};

export default function LegendItem({ color, title, percent }: Props) {
  return (
    <StyledLegendItem>
      <TitleWrapper>
        <LegendItemColor $color={color} />
        {title}
      </TitleWrapper>
      <Percent>{percent}%</Percent>
    </StyledLegendItem>
  );
}

const StyledLegendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: #75767f;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Percent = styled.div`
  color: ${designSystem.color.primary.blue500};
`;

const LegendItemColor = styled.div<{ $color: string }>`
  display: flex;
  top: -1px;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;
