import Header from "@components/Header/Header";
import TVIndicesWidget from "@components/TradingViewWidgets/TVIndicesWidget";
import TVStockDetailWidget from "@components/TradingViewWidgets/TVStockDetailWidget";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function IndicesPage() {
  const { tickerSymbol } = useParams();

  if (!tickerSymbol) {
    return <Navigate to={Routes.FALLBACK} />;
  }

  return (
    <>
      <Header />
      <BasePage>
        <Main>
          <LeftContainer>
            <Title>{tickerSymbol}</Title>
            <TVStockDetailWidget tickerSymbol={tickerSymbol} />
          </LeftContainer>
          <RightContainer>
            <p>인덱스</p>
            <TVIndicesWidget width={278} height={679} />
          </RightContainer>
        </Main>
      </BasePage>
    </>
  );
}

const Main = styled.main`
  padding: 48px;
  display: flex;
  gap: 16px;
`;

const LeftContainer = styled.div`
  width: 1082px;
  height: 796px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
`;

const Title = styled.h1`
  font: ${designSystem.font.heading2.font};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 342px;
  height: 796px;
  padding: 32px;
  background-color: ${designSystem.color.neutral.white};

  > p {
    font: ${designSystem.font.heading3.font};
    letter-spacing: ${designSystem.font.heading3.letterSpacing};
  }
`;
