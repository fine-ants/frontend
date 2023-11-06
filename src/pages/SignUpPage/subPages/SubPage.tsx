import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function SubPage({ children }: Props) {
  return <StyledSubPage>{children}</StyledSubPage>;
}

const StyledSubPage = styled.div`
  width: 720px;
  padding: 80px;
  background-color: cyan;
`;
