import styled from "styled-components";

type Props = {
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
      <Percent>{Math.floor(percent)}%</Percent>
    </StyledLegendItem>
  );
}

const StyledLegendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
  color: #75767f;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Percent = styled.div`
  color: ${({ theme: { color } }) => color.primary.blue500};
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
