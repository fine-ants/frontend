import styled from "styled-components";

export type Props = {
  color: string;
  title: string;
  percent: number;
};

export default function WideLegendItem({ color, title, percent }: Props) {
  return (
    <StyledLegendItem>
      <TitleWrapper>
        <LegendItemColor $color={color} />
        {title}
      </TitleWrapper>
      <Percent>{Math.floor(percent)}%</Percent>
    </StyledLegendItem>
  );
}

const StyledLegendItem = styled.div`
  width: 106px;
  display: flex;
  // margin-right: 24px;
  // margin-bottom: 8px;
  justify-content: space-between;
  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
  color: #75767f;
`;

const TitleWrapper = styled.div`
  display: flex;

  justify-content: center;

  gap: 3px;
`;

const Percent = styled.div`
  color: ${({ theme: { color } }) => color.primary.blue500};
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
