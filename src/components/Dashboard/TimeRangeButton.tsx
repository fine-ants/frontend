import styled from "styled-components";

type Props = {
  range: string;
  index: number;
  onClick: (index: number) => void;
};

export default function TimeRangeButton({ range, index, onClick }: Props) {
  return (
    <StyledTimeRangeButton onClick={() => onClick(index)}>
      {range}
    </StyledTimeRangeButton>
  );
}

const StyledTimeRangeButton = styled.button`
  width: 100px;
  height: 100%;
`;
