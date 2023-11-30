// TODO: 디자인 진행중인 컴포넌트입니다.

import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function TextButton({ children, onClick, disabled }: Props) {
  return (
    <StyledTextButton $disabled={disabled} onClick={onClick}>
      {children}
    </StyledTextButton>
  );
}

const StyledTextButton = styled.button<{ $disabled?: boolean }>`
  height: 32px;
  min-width: 80px;
  font: ${({ theme: { font } }) => font.button2};
  color: ${({ theme: { color }, $disabled }) =>
    $disabled ? color.neutral.gray500 : color.neutral.white};
  background-color: inherit;
  padding: 0 16px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme: { color }, $disabled }) =>
      $disabled ? "inherit" : color.neutral.white08};
  }
`;
