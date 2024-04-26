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
  display: flex;
  gap: 48px;
  flex-direction: column;

  > label {
    font-size: 14px;
  }
`;
