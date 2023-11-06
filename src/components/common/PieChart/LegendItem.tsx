import styled from "styled-components";

type Props = {
  color: string;
  title: string;
  percent: number;
};

export default function LegendItem({ color, title, percent }: Props) {
  return (
    <StyledLegendItem>
      <LegendItemColor $color={color} />
      {title} {percent}%
    </StyledLegendItem>
  );
}

const StyledLegendItem = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const LegendItemColor = styled.div<{ $color: string }>`
  display: flex;
  top: -1px;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 10px;
  height: 10px;
  border-radius: 4px;
  background-color: ${({ $color }) => $color};
`;
