import { EllipsisTextTooltip } from "@components/Tooltips/EllipsisTextTooltip";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export type Props = {
  color: string;
  title: string;
  percent: number;
};

export default function WideLegendItem({ color, title, percent }: Props) {
  return (
    <StyledLegendItem>
      <Title>
        <LegendItemColor $color={color} />
        <TitleTextWrapper>
          <EllipsisTextTooltip>{title}</EllipsisTextTooltip>
        </TitleTextWrapper>
      </Title>
      <Percent>{Math.floor(percent)}%</Percent>
    </StyledLegendItem>
  );
}

const StyledLegendItem = styled.div`
  width: 105px;
  display: flex;
  justify-content: space-between;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: #75767f;
`;

const Title = styled.div`
  width: 76px;
  display: flex;
  justify-content: center;
  gap: 3px;
`;

const TitleTextWrapper = styled.div`
  width: 63px;
`;

const Percent = styled.div`
  width: 30px;
  color: ${designSystem.color.primary.blue500};
`;

const LegendItemColor = styled.div<{ $color: string }>`
  display: flex;
  flex-shrink: 0;
  top: 3px;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;
