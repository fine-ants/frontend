import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function BasePage({ children }: Props) {
  return (
    <StyledBasePage>
      <Header />
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
  background-color: #f6f7ff;
`;

const Main = styled.main`
  width: 100%;
  height: 892px;
  display: flex;
  flex-direction: column;

  align-items: center;
  position: relative;
`;
