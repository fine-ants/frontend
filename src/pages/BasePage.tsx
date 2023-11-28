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
      <Main>
        <InnerWrapper>{children}</InnerWrapper>
      </Main>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid blue;
`;
