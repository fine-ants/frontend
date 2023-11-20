import styled from "styled-components";

type Props = {
  range: string;
  index: number;
  onClick: (index: number) => void;
  currentRangeIndex: number;
};

export default function TimeRangeButton({
  range,
  index,
  onClick,
  currentRangeIndex,
}: Props) {
  return (
    <StyledTimeRangeButton
      $isSelected={index === currentRangeIndex}
      onClick={() => onClick(index)}>
      {range}
    </StyledTimeRangeButton>
  );
}

const StyledTimeRangeButton = styled.button<{ $isSelected: boolean }>`
  border-radius: 4px;
  width: 48px;
  height: 24px;
  color: ${({ theme: { color }, $isSelected }) =>
    $isSelected ? color.primary.blue500 : color.neutral.gray600};
  background-color: ${({ theme: { color }, $isSelected }) =>
    $isSelected ? color.primary.blue50 : color.white};
  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
`;
