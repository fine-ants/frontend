import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props<T> = {
  value: T;
  selectedValue: T;
  onChange: (value: T) => void;
  children: ReactNode;
};

export default function SelectDrawerOption<T>({
  value,
  selectedValue,
  onChange,
  children,
}: Props<T>) {
  return (
    <SecuritiesFirmWrapper
      onClick={() => onChange(value)}
      $isSelected={value === selectedValue}>
      {children}
    </SecuritiesFirmWrapper>
  );
}

const SecuritiesFirmWrapper = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? designSystem.color.neutral.gray50 : "transparent"};
`;
