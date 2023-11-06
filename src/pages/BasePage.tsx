import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function BasePage({ children }: Props) {
  return <StyledBasePage>{children}</StyledBasePage>;
}

const StyledBasePage = styled.div`
  width: 100%;
  height: inherit;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
`;
