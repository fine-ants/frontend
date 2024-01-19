import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  count: number;
};

export default function CounterBadge({ count }: Props) {
  const displayCount = count >= 100 ? "99+" : count;
  return (
    <StyledCounterBadge $numLength={String(count).length}>
      {displayCount}
    </StyledCounterBadge>
  );
}

const StyledCounterBadge = styled.div<{ $numLength: number }>`
  height: 16px;

  background-color: ${designSystem.color.state.red500};
  color: white;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2px;
  right: 1px;
  width: ${({ $numLength }) => {
    switch ($numLength) {
      case 1:
        return 16;
      case 2:
        return 19;
      case 3:
        return 26;
      default:
        return 16;
    }
  }}px;
  border-radius: ${({ $numLength }) => {
    switch ($numLength) {
      case 1:
        return 50;
      default:
        return 8;
    }
  }}px;
  transform: ${({ $numLength }) => {
    switch ($numLength) {
      case 1:
        return "translateX(-5%)";
      case 2:
        return "translateX(10%)";
      case 3:
        return "translateX(35%)";
      default:
        return "translateX(50%)";
    }
  }};
`;
