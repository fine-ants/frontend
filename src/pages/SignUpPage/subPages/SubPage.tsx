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
