import arrow from "@assets/icons/ic_arrow-left.svg";
import styled from "styled-components";

type Props = {
  onPrev: () => void;
};

export function AuthOnPrevButton({ onPrev }: Props) {
  return (
    <div>
      <StyledButton onClick={onPrev}>
        <img src={arrow} />
      </StyledButton>
    </div>
  );
}

const StyledButton = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 0;
`;
