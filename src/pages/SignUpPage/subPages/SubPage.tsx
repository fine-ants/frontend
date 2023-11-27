import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function SubPage({ children }: Props) {
  return <StyledSubPage>{children}</StyledSubPage>;
}

const StyledSubPage = styled.div`
  width: 100%;
  padding: 48px 0;
  display: flex;
  gap: 16px;
  flex-direction: column;

  > label {
    font-size: 14px;
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const SignUpInput = styled.input`
  font-size: 16px;
  padding: 16px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #dedee0;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
