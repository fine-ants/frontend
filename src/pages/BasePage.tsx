import Footer from "@components/common/Footer";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function BasePage({ children }: Props) {
  return (
    <StyledBasePage>
      <Main>{children}</Main>
      <Footer />
    </StyledBasePage>
  );
}

const StyledBasePage = styled.div`
  width: 100%;
  height: inherit;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
